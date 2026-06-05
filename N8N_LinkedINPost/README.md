# LinkedIn Post Creation — n8n Workflow

Automated AI-powered LinkedIn post generation workflow. Given a domain context covering Playwright (AI agents, MCP, CLI), n8n, LangFlow, RAG, MCP, Crew.ai, and LLM evaluation, the workflow generates a bold topic comparing MCP and RAG, crafts a full LinkedIn post, and writes the result to Google Sheets for review and publishing.

---

## Architecture

```
Chat Trigger → [Topic Creator Agent] → [LinkedIn Content Creator Agent] → Google Sheets
                   │                              │
              Groq (LLM)                     Groq (LLM)
         Gemini (Structured Parser)    Gemini → Structured Parser1
```

---

## Node Breakdown

| # | Node | Type | Purpose |
|---|------|------|---------|
| 1 | **When chat message received** | Chat Trigger | Entry point — receives a chat message to kick off the workflow |
| 2 | **Topic Creator** | AI Agent | Generates a single bold, insight-driven topic comparing MCP and RAG in table format, drawing from the domain: Playwright AI agents, Playwright MCP, Playwright CLI, AI agents, n8n, LangFlow, RAG, MCP, Crew.ai, LLM evaluation |
| 3 | **Structured Output Parser** | Output Parser | Forces the Topic Creator to output structured JSON (`topic`, `rationale`, `hook`) |
| 4 | **formatter** | Google Gemini Chat Model | Powers the Structured Output Parser with Gemini for formatting |
| 5 | **Groq Chat Model** | Groq Chat Model | LLM backing the Topic Creator agent |
| 6 | **LinkedIn Content Creator** | AI Agent | Crafts a 150–300 word LinkedIn post from the topic, rationale, and hook; also generates an image prompt |
| 7 | **Structured Output Parser1** | Output Parser | Forces the Content Creator to output structured JSON (`content`, `image prompt`) |
| 8 | **Groq Chat Model1** | Groq Chat Model | LLM backing the LinkedIn Content Creator agent |
| 9 | **Append or update row in sheet** | Google Sheets | Writes the generated post to a Google Sheet (upserts by `Topic` column) |

---

## Integrations & Credentials Required

| Service | Purpose | Credential Type |
|---------|---------|-----------------|
| **Groq** | LLM provider for both AI Agents | Groq API key |
| **Google Gemini** | Formatting/output parsing | Google Gemini (PaLM) API key |
| **Google Sheets** | Final output storage | Google Sheets OAuth2 |

---

## Google Sheets Schema

The following columns are written to the sheet:

| Column | Source | Description |
|--------|--------|-------------|
| `Topic` | Topic Creator output | Generated topic title |
| `Rationale` | Topic Creator output | Justification for the topic |
| `Hook` | Topic Creator output | Suggested scroll-stopping hook |
| `Content` | LinkedIn Content Creator output | Full LinkedIn post (150–300 words) |
| `Image Prompt` | LinkedIn Content Creator output | AI image generation prompt for the post |
| `Status` | Hardcoded (`Draft`) | Post lifecycle status |
| `Date` | `{{ $today }}` | Current date |

The node uses **appendOrUpdate** mode, matching on the `Topic` column — if a row with the same topic already exists, it updates the row instead of duplicating.

---

## How It Works

1. A chat message is sent to the **Chat Trigger** webhook.
2. The **Topic Creator** agent (backed by **Groq**) uses a system prompt to generate a single bold topic comparing **MCP vs RAG**, along with a rationale and hook. The agent can draw from domains including Playwright, n8n, LangFlow, Crew.ai, and LLM evaluation. The **Gemini** model and **Structured Output Parser** enforce the output schema.
3. The generated topic data passes to the **LinkedIn Content Creator** agent (also backed by **Groq**), which crafts a full LinkedIn post and an image prompt in the defined tone and format.
4. The **Structured Output Parser1** ensures the output contains `content` and `image prompt` fields.
5. The result is written to **Google Sheets** for editorial review.

---

## How to Import & Run

### Prerequisites

- **n8n** instance (self-hosted or cloud)
- API keys for:
  - [Groq](https://console.groq.com/)
  - [Google Gemini (PaLM)](https://makersuite.google.com/)
- A **Google Sheets** document with the expected columns (see schema above)
- Google Cloud project with Google Sheets API enabled (for OAuth2)

### Import

1. Open your n8n instance.
2. Go to **Workflows** → **Import from file**.
3. Select `LinkedInpostCreation_0523.json`.
4. Reconfigure the credentials for each node:
   - **Groq Chat Model** / **Groq Chat Model1** — provide your Groq API key
   - **formatter** — provide your Google Gemini API key
   - **Append or update row in sheet** — authenticate via Google Sheets OAuth2
5. Update the **documentId** and **sheetName** in the Google Sheets node to point to your own sheet.

### Run

1. Activate the workflow (toggle to **Active**).
2. Send a chat message to the webhook endpoint (e.g., from the n8n chat interface or via HTTP POST).
3. Check the Google Sheet for the generated post.

---

## LLM Models Used

| Node | Model |
|------|-------|
| Groq Chat Model | `openai/gpt-oss-120b` |
| Groq Chat Model1 | `openai/gpt-oss-120b` |
| formatter (Gemini) | `models/gemini-2.0-flash-lite` |
