import sys
import json
import requests
import traceback
import os

def generate_cases_stream(llm_config, request_data):
    provider = llm_config.get("provider", "openai").lower()
    api_key = llm_config.get("api_key", "")
    api_url = llm_config.get("api_url", "")
    model = llm_config.get("model_name", "")
    
    if provider in ["openai", "groq"]:
        url = api_url if api_url else ("https://api.groq.com/openai/v1/chat/completions" if provider == "groq" else "https://api.openai.com/v1/chat/completions")
        default_model = "llama3-8b-8192" if provider == "groq" else "gpt-4-turbo"
        
        system_prompt = """You are a Principal SDET QA Assistant operating under STRICT ANTI-HALLUCINATION RULES.
You may ONLY use information explicitly provided in the user's Context.

## STRICT RULES (MANDATORY)
1. DO NOT invent features, APIs, error codes, UI elements, or behavior.
2. If information is missing or unclear to create a step or expectation, state: "Insufficient information to determine."
3. Every assertion in your test cases must be easily traceable to the provided input.
4. If a detail is lightly inferred for practicality, label it explicitly as: "Inference (low confidence)".

## OUTPUT FORMAT (STRICT)
Format your entire response strictly following these 4 sequential headers. You must output a Markdown Table under 'Generated Output' mapping to JIRA Test Case fields.

- Verified Facts: [Bullet points of exact facts extracted]
- Missing / Unknown Information: [Bullet points of things not defined]
- Generated Output:
| Test Case ID | Summary | Preconditions | Steps | Expected Results | Priority |
|---|---|---|---|---|---|
| TC-01 | ... | ... | ... | ... | ... |

- Self-Validation Check: [Validate your output against the anti-hallucination rules]"""

        context_text = request_data.get("additional_context", "No context provided.")
        
        payload = {
            "model": model if model else default_model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Context Payload:\n{context_text}"}
            ],
            "temperature": 0.1,
            "stream": True
        }
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        with requests.post(url, headers=headers, json=payload, stream=True) as resp:
            if resp.status_code != 200:
                print(f"data: {json.dumps({'status': 'error', 'message': f'HTTP {resp.status_code}'})}\n\n", flush=True)
                return
                
            for line in resp.iter_lines():
                if line:
                    decoded_line = line.decode('utf-8')
                    print(f"{decoded_line}\n\n", flush=True)
                    
    else:
        print(f"data: {json.dumps({'status': 'error', 'message': 'Provider stream not configured for Smart Test Cases'})}\n\n", flush=True)

def main():
    if len(sys.argv) < 2:
        return
        
    try:
        payload = json.loads(sys.argv[1])
        llm_config = payload.get("llm_config", {})
        request_data = payload.get("request_data", {})
        generate_cases_stream(llm_config, request_data)
        
    except Exception as e:
        print(f"data: {json.dumps({'status': 'error', 'message': str(e)})}\n\n", flush=True)

if __name__ == "__main__":
    main()
