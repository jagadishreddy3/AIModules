import sys
import json
import requests
import traceback

def test_llm(config):
    provider = config.get("provider", "").lower()
    api_key = config.get("api_key", "")
    api_url = config.get("api_url", "")
    
    if not provider:
        return {"status": "error", "message": "Provider is required"}
    
    try:
        # Minimal ping logic
        if provider in ["openai", "groq"]:
            url = api_url or "https://api.openai.com/v1/models"
            if provider == "groq" and not api_url:
                url = "https://api.groq.com/openai/v1/models"
                
            headers = {"Authorization": f"Bearer {api_key}"}
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                return {"status": "success", "message": f"{provider.capitalize()} API connected successfully"}
            else:
                return {"status": "error", "message": f"HTTP {resp.status_code}: {resp.text}"}
                
        elif provider == "ollama":
            url = api_url or "http://localhost:11434/api/tags"
            resp = requests.get(url, timeout=5)
            if resp.status_code == 200:
                return {"status": "success", "message": "Ollama engine is available"}
            else:
                return {"status": "error", "message": f"HTTP {resp.status_code}: {resp.text}"}

        elif provider == "grok":
            return {"status": "success", "message": "Grok placeholder validation (Success)"}
            
        else:
            return {"status": "error", "message": f"Unsupported LLM provider: {provider}"}
            
    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": f"Connection failed: {str(e)}"}
        
def test_source(config):
    provider = config.get("provider", "").lower()
    if provider == "jira":
        domain = config.get("domain_url", "").strip("/")
        if not domain.startswith("http"):
            domain = f"https://{domain}"
            
        email = config.get("email", "")
        token = config.get("api_token", "")
        
        if not domain or not email or not token:
            return {"status": "error", "message": "Jira requires domain_url, email, and api_token"}
            
        url = f"{domain}/rest/api/3/myself"
        headers = {
            "Accept": "application/json"
        }
        try:
            resp = requests.get(url, headers=headers, auth=(email, token), timeout=10)
            if resp.status_code == 200:
                return {"status": "success", "message": "Jira Cloud connected successfully"}
            else:
                try:
                    err_text = resp.json().get("errorMessages", [resp.text])[0]
                except:
                    err_text = resp.text
                if resp.status_code == 401:
                    err_text = "Invalid API Token or Email. Ensure you are using an Atlassian API Token generated from id.atlassian.com, NOT your login password."
                return {"status": "error", "message": f"HTTP {resp.status_code}: {err_text}"}
        except requests.exceptions.RequestException as e:
             return {"status": "error", "message": f"Jira Connection failed: {str(e)}"}
             
    elif provider == "ado":
        return {"status": "error", "message": "ADO validation not strictly implemented yet"}
    else:
        return {"status": "error", "message": f"Unsupported source provider: {provider}"}

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"status": "error", "message": "Missing JSON payload"}))
        sys.exit(1)
        
    try:
        payload = json.loads(sys.argv[1])
        conn_type = payload.get("type")
        config = payload.get("config", {})
        
        if conn_type == "llm":
            result = test_llm(config)
        elif conn_type == "source":
            result = test_source(config)
        else:
            result = {"status": "error", "message": f"Unknown connection type: {conn_type}"}
            
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Internal Error: {str(e)}", "trace": traceback.format_exc()}))

if __name__ == "__main__":
    main()
