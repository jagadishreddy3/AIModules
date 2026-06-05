@echo off
REM Start TestCase MCP Server in stdio mode (for Claude Desktop, Cursor, VS Code, etc.)
cd /d "%~dp0"
python server.py
