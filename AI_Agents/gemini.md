# Project Constitution (Gemini)

## 1. Data Schemas

### 1.1 UI to Backend (Generation Request)
```json
{
  "llm_config": {
    "provider": "groq|ollama|grok|openai",
    "api_url": "string",
    "api_key": "string",
    "model_name": "string"
  },
  "source_config": {
    "provider": "jira|ado",
    "domain_url": "string",
    "email": "string",
    "api_token": "string"
  },
  "request_data": {
    "ticket_id": "string",
    "additional_context": "string",
    "attachments": []
  }
}
```

### 1.2 Connection Test Request
```json
{
  "type": "llm|source",
  "config": {
    // fields from llm_config or source_config
  }
}
```

### 1.3 Backend to UI (Response)
```json
{
  "status": "success|error",
  "message": "string",
  "data": {
    "generated_plan_text": "string (markdown preview)",
    "file_path": "string (path to downloadable .docx)"
  }
}
```

## 2. Behavioral Rules
- Prioritize reliability over speed.
- Deterministic handling of business logic via standard tools.
- No guessing of inputs; rigid adherence to defined schemas.

## 3. Architectural Invariants
- Separate concerns into 3 layers (Architecture, Navigation, Tools).
- All changes must reflect in this document if rules, architecture, or schemas change.
- `gemini.md` acts as the definitive law for code updates/adjustments.
