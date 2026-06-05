"""
TestCase MCP Server using FastMCP.
Reads from and writes to a CSV file containing test cases.
Supports both stdio (for Claude Desktop / Cursor) and SSE (for web clients).

Run:
  python server.py              # stdio mode (default)
  python server.py --sse        # SSE mode on http://127.0.0.1:8080/sse
"""

import argparse
import csv
import io
import json
import os
import re
import sys
from pathlib import Path
from typing import Any

from mcp.server.fastmcp import FastMCP

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).parent.resolve()
DATA_DIR = BASE_DIR / "data"
CSV_FILE = DATA_DIR / "testcases_vwo_5000.csv"

# ---------------------------------------------------------------------------
# CSV Helper Class
# ---------------------------------------------------------------------------

class TestCaseStore:
    """Handles reading, querying, and appending to the test-case CSV."""

    def __init__(self, csv_path: Path):
        self.csv_path = csv_path
        self.fieldnames: list[str] = []
        self.rows: list[dict[str, str]] = []
        self._load()

    def _load(self) -> None:
        """Load all rows from the CSV into memory."""
        if not self.csv_path.exists():
            self.fieldnames = []
            self.rows = []
            return

        with open(self.csv_path, "r", encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f)
            self.fieldnames = list(reader.fieldnames or [])
            self.rows = [dict(row) for row in reader]

    def _save(self) -> None:
        """Persist current rows back to the CSV file."""
        self.csv_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.csv_path, "w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=self.fieldnames, quoting=csv.QUOTE_ALL)
            writer.writeheader()
            writer.writerows(self.rows)

    def reload(self) -> None:
        """Reload from disk (useful if the file was modified externally)."""
        self._load()

    def get_columns(self) -> list[str]:
        """Return the list of column names."""
        return self.fieldnames

    def get_unique_values(self, column: str) -> list[str]:
        """Return sorted unique values for a given column."""
        if column not in self.fieldnames:
            return []
        values = {row.get(column, "").strip() for row in self.rows if row.get(column, "").strip()}
        return sorted(values)

    def get_stats(self) -> dict[str, Any]:
        """Return basic statistics about the dataset."""
        return {
            "total_testcases": len(self.rows),
            "columns": self.fieldnames,
            "file": str(self.csv_path),
        }

    def query(self, filters: dict[str, str]) -> list[dict[str, str]]:
        """
        Return rows matching ALL provided filters (AND logic).
        Values are treated as case-insensitive substrings.
        """
        results = []
        for row in self.rows:
            match = True
            for col, val in filters.items():
                if col not in row:
                    match = False
                    break
                if val.lower() not in row[col].lower():
                    match = False
                    break
            if match:
                results.append(dict(row))
        return results

    def get_by_id(self, test_id: str) -> dict[str, str] | None:
        """Fetch a single row by exact ID match (supports 'TC-00001' or just 'TC-00001')."""
        tid = test_id.strip().lower()
        for row in self.rows:
            if row.get("id", "").strip().lower() == tid:
                return dict(row)
        return None

    def _extract_prefix(self) -> str:
        """Infer the ID prefix (e.g. 'TC-' from 'TC-00001')."""
        for row in self.rows:
            tid = row.get("id", "").strip()
            if tid:
                m = re.match(r"^([A-Za-z]+[-_]?)", tid)
                if m:
                    return m.group(1)
        return "TC-"

    def _next_id(self) -> str:
        """Generate the next sequential ID based on existing entries (e.g. TC-05001)."""
        prefix = self._extract_prefix()
        max_num = 0
        for row in self.rows:
            tid = row.get("id", "").strip()
            if not tid:
                continue
            num_str = re.sub(r"^" + re.escape(prefix), "", tid)
            num_str = re.sub(r"\D", "", num_str)
            if num_str.isdigit():
                max_num = max(max_num, int(num_str))
        return f"{prefix}{max_num + 1:05d}"

    def add_testcase(self, data: dict[str, str]) -> dict[str, str]:
        """
        Append a new test-case row.
        - Auto-generates 'id' if missing/empty.
        - Any missing columns are filled with empty strings.
        - Unknown keys are ignored.
        Returns the created row.
        """
        if not self.fieldnames:
            raise RuntimeError("CSV has no columns. Cannot add test case.")

        new_row: dict[str, str] = {}
        for col in self.fieldnames:
            if col == "id":
                tid = data.get("id", "").strip()
                new_row[col] = tid if tid else self._next_id()
            else:
                new_row[col] = data.get(col, "").strip()

        self.rows.append(new_row)
        self._save()
        return dict(new_row)


# ---------------------------------------------------------------------------
# Initialise store
# ---------------------------------------------------------------------------
store = TestCaseStore(CSV_FILE)

# ---------------------------------------------------------------------------
# FastMCP Setup
# ---------------------------------------------------------------------------
mcp = FastMCP("TestCaseManager")

# ---------------------------------------------------------------------------
# Resources
# ---------------------------------------------------------------------------

@mcp.resource("testcases://all")
def all_testcases() -> str:
    """Return every test case in the CSV as a JSON array."""
    return json.dumps(store.rows, indent=2)


@mcp.resource("testcases://summary")
def testcases_summary() -> str:
    """High-level summary of the test-case repository."""
    stats = store.get_stats()
    return json.dumps(
        {
            **stats,
            "note": "Use testcases://all for full dataset or tools to query/filter.",
        },
        indent=2,
    )


@mcp.resource("schema://columns")
def schema_columns() -> str:
    """List the available columns in the CSV."""
    return json.dumps(
        {"columns": store.get_columns(), "file": str(CSV_FILE)},
        indent=2,
    )


# ---------------------------------------------------------------------------
# Prompts
# ---------------------------------------------------------------------------

@mcp.prompt()
def analyze_testcases(testcases_json: str) -> str:
    """Analyze a set of test cases and provide insights."""
    return f"""Please analyze the following test cases and provide insights:

```json
{testcases_json}
```

For each test case, evaluate:
1. Coverage (does it cover the requirement well?)
2. Clarity (are steps and expected results clear?)
3. Priority appropriateness
4. Any gaps or missing scenarios

Provide a summary table and actionable recommendations."""


@mcp.prompt()
def generate_similar_testcase(reference_json: str) -> str:
    """Generate a new test case similar to an existing one."""
    return f"""Based on the following reference test case, generate a new, related test case:

```json
{reference_json}
```

The new test case should:
1. Test a closely related but distinct scenario
2. Follow the same format and structure
3. Have a unique Test ID (you can use the add_testcase tool after creation)
4. Include appropriate priority and status values

Return the new test case as a JSON object."""


@mcp.prompt()
def review_testcase_quality(testcases_json: str) -> str:
    """Review the quality of provided test cases."""
    return f"""Review the quality of these test cases:

```json
{testcases_json}
```

Check for:
1. Consistency in format and style
2. Completeness of all required fields
3. Actionable test steps
4. Clear, verifiable expected results
5. Appropriate priority assignments
6. Redundancy or duplication

Give each test case a quality score (1-5) and list improvement suggestions."""


@mcp.prompt()
def create_testcase_from_requirement(requirement_text: str) -> str:
    """Create a test case based on a requirement description."""
    return f"""Convert the following requirement into a well-structured test case:

Requirement:
```
{requirement_text}
```

The test case must include:
- summary (title of what is being verified)
- module (which module/feature this belongs to)
- priority (P1-Critical / P2-High / P3-Medium / P4-Low)
- severity (Critical / Major / Minor / Trivial)
- labels (comma or pipe-separated tags: smoke, regression, sanity, ui, etc.)
- preconditions (setup needed before testing)
- steps (numbered, actionable test steps)
- expected_result (clear pass criteria)
- test_type (Functional / UI / API / Performance / Security / etc.)
- owner (name of the test case owner)
- sprint (sprint identifier, e.g. VWO-25.S38)
- status (Active / Inactive / Draft)

Return as a JSON object with these keys. You can then use the add_testcase tool to save it."""


# ---------------------------------------------------------------------------
# Tools
# ---------------------------------------------------------------------------

@mcp.tool()
def get_columns() -> str:
    """Discovery helper: list all available columns in the CSV."""
    return json.dumps(
        {
            "columns": store.get_columns(),
            "hint": "Use get_column_values to see what values each column contains.",
        },
        indent=2,
    )


@mcp.tool()
def get_column_values(column_name: str) -> str:
    """
    Discovery helper: get all unique values for a specific column.
    Useful for understanding what filters are available.
    """
    cols = store.get_columns()
    if column_name not in cols:
        return json.dumps(
            {
                "error": f"Column '{column_name}' not found.",
                "available_columns": cols,
            },
            indent=2,
        )

    values = store.get_unique_values(column_name)
    return json.dumps(
        {
            "column": column_name,
            "unique_values": values,
            "count": len(values),
        },
        indent=2,
    )


@mcp.tool()
def get_stats() -> str:
    """Return statistics about the test-case repository."""
    return json.dumps(store.get_stats(), indent=2)


@mcp.tool()
def get_testcases(
    test_id: str = "",
    jira_id: str = "",
    summary: str = "",
    module: str = "",
    priority: str = "",
    severity: str = "",
    labels: str = "",
    preconditions: str = "",
    steps: str = "",
    expected_result: str = "",
    test_type: str = "",
    owner: str = "",
    sprint: str = "",
    status: str = "",
) -> str:
    """
    Query test cases by any combination of columns.
    Only provide values for the columns you want to filter by;
    empty strings are ignored. Matching is case-insensitive substring.
    """
    filters: dict[str, str] = {}
    local_map = {
        "id": test_id,
        "jira_id": jira_id,
        "summary": summary,
        "module": module,
        "priority": priority,
        "severity": severity,
        "labels": labels,
        "preconditions": preconditions,
        "steps": steps,
        "expected_result": expected_result,
        "test_type": test_type,
        "owner": owner,
        "sprint": sprint,
        "status": status,
    }

    for col, val in local_map.items():
        if val.strip():
            filters[col] = val.strip()

    results = store.query(filters)
    return json.dumps(
        {
            "filters": filters,
            "count": len(results),
            "testcases": results,
        },
        indent=2,
    )


@mcp.tool()
def get_testcase_by_id(test_id: str) -> str:
    """Fetch a single test case by its exact ID (e.g. 'TC-00001')."""
    row = store.get_by_id(test_id)
    if row is None:
        return json.dumps(
            {"error": f"Test case with ID '{test_id}' not found."},
            indent=2,
        )
    return json.dumps(row, indent=2)


@mcp.tool()
def add_testcase(
    id: str = "",
    jira_id: str = "",
    summary: str = "",
    module: str = "",
    priority: str = "",
    severity: str = "",
    labels: str = "",
    preconditions: str = "",
    steps: str = "",
    expected_result: str = "",
    test_type: str = "",
    owner: str = "",
    sprint: str = "",
    status: str = "",
) -> str:
    """
    Append a new test case to the CSV.
    - 'id' is optional; if omitted, the next sequential ID is auto-generated.
    - All other fields are optional; missing values become empty strings.
    - The file is saved immediately.
    """
    data = {
        "id": id,
        "jira_id": jira_id,
        "summary": summary,
        "module": module,
        "priority": priority,
        "severity": severity,
        "labels": labels,
        "preconditions": preconditions,
        "steps": steps,
        "expected_result": expected_result,
        "test_type": test_type,
        "owner": owner,
        "sprint": sprint,
        "status": status,
    }

    try:
        created = store.add_testcase(data)
        return json.dumps(
            {"message": "Test case added successfully.", "testcase": created},
            indent=2,
        )
    except Exception as e:
        return json.dumps({"error": str(e)}, indent=2)


@mcp.tool()
def reload_csv() -> str:
    """Reload the CSV from disk. Useful if the file was edited externally."""
    store.reload()
    return json.dumps(
        {"message": "CSV reloaded from disk.", "stats": store.get_stats()},
        indent=2,
    )


# ---------------------------------------------------------------------------
# ASGI CORS wrapper (needed for browser-based MCP clients like Inspector)
# ---------------------------------------------------------------------------

class CORSWrapper:
    """ASGI middleware that injects CORS headers for browser-based MCP clients."""

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] == "http" and scope["method"] == "OPTIONS":
            await send(
                {
                    "type": "http.response.start",
                    "status": 200,
                    "headers": [
                        (b"access-control-allow-origin", b"*"),
                        (b"access-control-allow-methods", b"*"),
                        (b"access-control-allow-headers", b"*"),
                        (b"access-control-allow-credentials", b"true"),
                    ],
                }
            )
            await send({"type": "http.response.body", "body": b""})
            return

        async def wrapped_send(message):
            if message["type"] == "http.response.start":
                headers = list(message.get("headers", []))
                headers.append((b"access-control-allow-origin", b"*"))
                headers.append((b"access-control-allow-methods", b"*"))
                headers.append((b"access-control-allow-headers", b"*"))
                headers.append((b"access-control-allow-credentials", b"true"))
                message["headers"] = headers
            await send(message)

        await self.app(scope, receive, wrapped_send)


# ---------------------------------------------------------------------------
# Entrypoint
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="TestCase MCP Server")
    parser.add_argument(
        "--sse",
        action="store_true",
        help="Run in SSE mode on http://127.0.0.1:8080/sse",
    )
    parser.add_argument(
        "--host",
        default="127.0.0.1",
        help="Host for SSE mode (default: 127.0.0.1)",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8080,
        help="Port for SSE mode (default: 8080)",
    )
    args = parser.parse_args()

    if args.sse:
        print(f"[TestCaseManager] Starting SSE MCP server on http://{args.host}:{args.port}/sse")
        import uvicorn

        app = CORSWrapper(mcp.sse_app())
        uvicorn.run(app, host=args.host, port=args.port, log_level="warning")
    else:
        print("[TestCaseManager] Starting stdio MCP server", file=sys.stderr)
        mcp.run(transport="stdio")


if __name__ == "__main__":
    main()
