import sys
import json
import requests
import traceback

def parse_jira_issue(issue_data):
    fields = issue_data.get("fields", {})
    return {
        "summary": fields.get("summary", ""),
        "description": fields.get("description", ""),
        "issuetype": fields.get("issuetype", {}).get("name", ""),
        "status": fields.get("status", {}).get("name", "")
    }

def fetch_source_ticket(config, ticket_id):
    # Extract the key if a full URL was pasted (e.g., https://.../browse/KAN-4)
    if ticket_id and "/" in ticket_id:
        ticket_id = ticket_id.split("/")[-1].split("?")[0].strip()
        
    provider = config.get("provider", "").lower()
    if provider == "jira":
        domain = config.get("domain_url", "").strip("/")
        if not domain.startswith("http"):
             domain = f"https://{domain}"
             
        email = config.get("email", "")
        token = config.get("api_token", "")
        
        if not domain or not email or not token or not ticket_id:
            return {"status": "error", "message": "Missing required fields to fetch Jira ticket"}
            
        url = f"{domain}/rest/api/3/issue/{ticket_id}"
        headers = {"Accept": "application/json"}
        
        try:
            resp = requests.get(url, headers=headers, auth=(email, token), params={"fields": "summary,description,issuetype,status"}, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                parsed = parse_jira_issue(data)
                
                context = f"--- JIRA TICKET FETCHED [{ticket_id}] ---\n\n"
                context += f"Subject: {parsed['summary']}\n"
                context += f"Type: {parsed['issuetype']} | Status: {parsed['status']}\n\n"
                
                desc = parsed['description']
                desc_text = "Description:\n"
                if isinstance(desc, dict):
                    # Basic ADF extraction
                    def extract_text(node):
                        text = ""
                        if node.get("type") == "text":
                            return node.get("text", "")
                        for child in node.get("content", []):
                            text += extract_text(child) + " "
                        if node.get("type") == "paragraph":
                            text += "\n"
                        return text
                    desc_text += extract_text(desc)
                else:
                    desc_text += str(desc)
                    
                context += desc_text
                
                return {"status": "success", "ticket_id": ticket_id, "ticket_context": context}
            else:
                 try:
                     err_text = resp.json().get("errorMessages", [resp.text])[0]
                 except:
                     err_text = resp.text
                 if resp.status_code == 401:
                     err_text = "Invalid API Token or Email. Ensure you are using an Atlassian API Token generated from id.atlassian.com, NOT your login password."
                 return {"status": "error", "message": f"HTTP {resp.status_code}: {err_text}"}
        except Exception as e:
            return {"status": "error", "message": f"Failed to fetch ticket: {str(e)}"}
            
    return {"status": "error", "message": f"Unsupported or unspecified provider: '{provider}'."}

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"status": "error", "message": "Missing JSON payload"}))
        sys.exit(1)
        
    try:
        payload = json.loads(sys.argv[1])
        source_config = payload.get("source_config", {})
        request_data = payload.get("request_data", {})
        
        ticket_id = request_data.get("ticket_id", "")
        result = fetch_source_ticket(source_config, ticket_id)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Internal Fetch Error: {str(e)}", "trace": traceback.format_exc()}))

if __name__ == "__main__":
    main()
