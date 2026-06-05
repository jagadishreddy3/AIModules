@echo off
REM Start TestCase MCP Server in SSE mode (for browser-based / web clients)
cd /d "%~dp0"
python server.py --sse --host 127.0.0.1 --port 8080
pause
