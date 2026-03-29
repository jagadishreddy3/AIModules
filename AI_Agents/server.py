import os
import sys
import json
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

TOOLS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tools')
PYTHON_EXEC = sys.executable

def run_tool(script_name, payload):
    script_path = os.path.join(TOOLS_DIR, script_name)
    if not os.path.exists(script_path):
         return {"status": "error", "message": f"Tool {script_name} not found."}
         
    try:
        # Pass the payload as a JSON string argument to the tool
        result = subprocess.run(
            [PYTHON_EXEC, script_path, json.dumps(payload)],
            capture_output=True,
            text=True,
            check=False
        )
        
        # Parse the JSON output from stdout
        try:
             output = result.stdout.strip()
             lines = output.split('\n')
             for line in reversed(lines):
                 try:
                     parsed = json.loads(line)
                     return parsed
                 except json.JSONDecodeError:
                     continue
             return {
                 "status": "error", 
                 "message": f"Failed to parse tool output. Exit code: {result.returncode}", 
                 "stdout": result.stdout, 
                 "stderr": result.stderr
             }
        except Exception as e:
             return {"status": "error", "message": f"JSON parse error: {str(e)}"}
             
    except Exception as e:
        return {
            "status": "error",
            "message": f"Execution failed: {str(e)}"
        }

@app.route('/api/test_connection', methods=['POST'])
def test_connection():
    return jsonify(run_tool('test_connection.py', request.json))

@app.route('/api/fetch_ticket', methods=['POST'])
def fetch_ticket():
    return jsonify(run_tool('fetch_ticket.py', request.json))

@app.route('/api/generate_plan', methods=['POST'])
def generate_plan():
    return jsonify(run_tool('generate_plan.py', request.json))

@app.route('/api/generate_cases', methods=['POST'])
def generate_cases():
    data = request.json
    def generate():
        import subprocess
        tools_path = os.path.join(os.path.dirname(__file__), 'tools')
        script = os.path.join(tools_path, 'generate_cases.py')
        
        process = subprocess.Popen(
            [sys.executable, script, json.dumps(data)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1
        )
        for line in iter(process.stdout.readline, ''):
            yield line
    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    print("🚀 Starting B.L.A.S.T API Engine on http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
