import sys
import json
import requests
import traceback
import os
import time

def call_llm(llm_config, prompt):
    provider = llm_config.get("provider", "").lower()
    api_key = llm_config.get("api_key", "")
    api_url = llm_config.get("api_url", "")
    model = llm_config.get("model_name", "")
    
    if provider in ["openai", "groq"]:
        url = api_url or "https://api.openai.com/v1/chat/completions"
        if provider == "groq" and not api_url:
             url = "https://api.groq.com/openai/v1/chat/completions"
        if not model:
             model = "llama3-8b-8192" if provider == "groq" else "gpt-3.5-turbo"
             
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": "You are an expert QA Test Planner. Generate a comprehensive Test Plan based on the provided context. Follow the structure of standard test plans (Objective, Scope, Test Cases, Entry/Exit criteria). Output markdown."},
                {"role": "user", "content": prompt}
            ]
        }
        
        resp = requests.post(url, headers=headers, json=payload, timeout=60)
        if resp.status_code == 200:
            return resp.json()["choices"][0]["message"]["content"]
        else:
            raise Exception(f"LLM API Error {resp.status_code}: {resp.text}")
            
    elif provider == "ollama":
        url = api_url or "http://localhost:11434/api/generate"
        if not model:
            model = "llama3"
            
        payload = {
            "model": model,
            "prompt": "You are an expert QA Test Planner. Generate a comprehensive Test Plan based on the following context. Output markdown.\n\n" + prompt,
            "stream": False
        }
        resp = requests.post(url, json=payload, timeout=120)
        if resp.status_code == 200:
            return resp.json()["response"]
        else:
            raise Exception(f"Ollama Error {resp.status_code}: {resp.text}")
            
    else:
         # Fallback mock for testing
         return f"--- GENERATED TEST PLAN ---\n\nObjective: Test {len(prompt)} characters of context.\n\nTest Cases:\n1. Verify basic payload.\n2. Handle edge cases."
         

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"status": "error", "message": "Missing JSON payload"}))
        sys.exit(1)
        
    try:
        payload = json.loads(sys.argv[1])
        llm_config = payload.get("llm_config", {})
        request_data = payload.get("request_data", {})
        
        context = request_data.get("additional_context", "")
        ticket_id = request_data.get("ticket_id", "")
        
        prompt = f"Create a test plan for Ticket ID: {ticket_id}\n\nAdditional Context:\n{context}\n\nPlease generate a strict markdown plan."
        
        generated_md = call_llm(llm_config, prompt)
        
        tmp_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".tmp")
        os.makedirs(tmp_dir, exist_ok=True)
        file_path = os.path.join(tmp_dir, f"TestPlan_{ticket_id or 'Manual'}_{int(time.time())}.md")
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(generated_md)
            
        print(json.dumps({
            "status": "success",
            "message": "Test plan generated successfully",
            "data": {
                "generated_plan_text": generated_md,
                "file_path": file_path
            }
        }))
        
    except Exception as e:
         print(json.dumps({"status": "error", "message": f"Generation Error: {str(e)}", "trace": traceback.format_exc()}))

if __name__ == "__main__":
    main()
