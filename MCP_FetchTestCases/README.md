# TestCase MCP Server — Team Setup Guide

A FastMCP server that reads and writes test cases from a CSV file (`data/VWO_Login_TestCases_Full.csv`).
It exposes **tools**, **prompts**, and **resources** so any MCP-compatible LLM can query, analyse, and append test cases.

## Features

- **Query by any column** — filter by `Priority`, `Status`, `Test Type`, `Test ID`, `Summary`, etc. (case-insensitive substring matching).
- **Auto-generate Test IDs** — when adding a test case without an ID, the server picks the next sequential number (e.g. `TC-132`).
- **Discovery helpers** — `get_columns` and `get_column_values` let LLMs understand what data exists before querying.
- **Append / create** — `add_testcase` appends a new row to the CSV and saves immediately.
- **Dual transport** — run in **stdio** mode (local AI assistants) or **SSE** mode (web / browser clients).

## Quick Start

### 1. Install dependencies

```bash
cd MCP_FetchTestCases
pip install -r requirements.txt
```

### 2. Run the server

**Stdio mode** (Claude Desktop, Cursor, VS Code MCP extensions):

```bash
python server.py
```

Or double-click `start_stdio.bat`.

**SSE mode** (browser / Inspector / custom web clients):

```bash
python server.py --sse --host 127.0.0.1 --port 8080
```

Or double-click `start_sse.bat`. Then open `http://127.0.0.1:8080/sse` in your client.

## Connecting to Claude Desktop

Add this to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "testcase-manager": {
      "command": "python",
      "args": [
        "D:\\Documents\\TestCaseGen_AntiGravity\\MCP_FetchTestCases\\server.py"
      ]
    }
  }
}
```

> **Note:** Use the absolute path to `server.py`. On macOS/Linux use forward slashes.

## Available Tools

| Tool | Purpose |
|------|---------|
| `get_columns` | List every column in the CSV. |
| `get_column_values(column_name)` | Show unique values for a column (great for discovering filters). |
| `get_stats` | Total count, column list, file path. |
| `get_testcases(...)` | Query by any combination of columns. Empty params are ignored. |
| `get_testcase_by_id(test_id)` | Fetch a single test case by exact Test ID. |
| `add_testcase(...)` | Append a new row. Missing fields become empty strings; missing Test ID is auto-generated. |
| `reload_csv` | Reload the CSV from disk (if edited externally). |

## Available Prompts

| Prompt | Purpose |
|--------|---------|
| `analyze_testcases` | Provide quality insights on a JSON set of test cases. |
| `generate_similar_testcase` | Create a new test case based on an existing one. |
| `review_testcase_quality` | Score and suggest improvements for test cases. |
| `create_testcase_from_requirement` | Turn a plain-text requirement into a structured test case. |

## Available Resources

| Resource | URI | Content |
|----------|-----|---------|
| All test cases | `testcases://all` | Full JSON array of every row. |
| Summary | `testcases://summary` | High-level stats + guidance. |
| Schema | `schema://columns` | Column names + file path. |

## CSV File Location

The server reads from and writes to:

```
MCP_FetchTestCases/data/VWO_Login_TestCases_Full.csv
```

If the file is missing, the server starts with an empty dataset until one is created.

## Team Tips

- Use `get_column_values` with `Priority` or `Status` first to see what values are available.
- Combine filters in `get_testcases` (e.g. `priority="Critical"` + `status="To Do"`) — they are combined with **AND** logic.
- When adding test cases via LLM, you can omit the `test_id`; the server will generate the next `TC-XXX` automatically.
- If you edit the CSV manually, call `reload_csv` so the server picks up the changes.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `ModuleNotFoundError: mcp` | Run `pip install -r requirements.txt`. |
| Permission denied on CSV | Ensure the Windows user has read/write access to `data/VWO_Login_TestCases_Full.csv`. |
| SSE not reachable | Check that port `8080` is free; use `--port 9090` to switch. |
| Changes not visible | Call `reload_csv` or restart the server. |

## License

Internal team use only.
