# Task Plan

## Blueprint
**Status: Pending Approval**

**Goal:** Build a TestCase Generator application that takes Jira requirements as input and outputs functional/non-functional API and Web application test cases in Jira format. 

**Tech Stack:**
- **Backend:** Node.js with TypeScript
- **Frontend:** React with TypeScript

**Core Features:**
1. **Input:** Accept Jira requirements (via chat/text input).
2. **Output:** Generate test cases formatted for Jira (Functional & Non-Functional, API & Web App).
3. **Settings Window:** Configure and manage API keys/endpoints for supported LLMs.
   - Supported LLMs: Ollama, LM Studio, Grok, OpenAI, Claude, Gemini.

## Phases
1. **Phase 1: Setup & Initialization**
   - Initialize project structure (Node.js backend, React frontend).
   - Configure TypeScript, testing frameworks, and styling.
2. **Phase 2: Frontend UI Development**
   - Build Settings window for API integrations (Ollama, LM Studio, Grok, OpenAI, Claude, Gemini) with Save and Test Connection options.
   - Build main dashboard with a History sidebar, chat/input area for requirements, and output view for generated Jira test cases.
3. **Phase 3: Backend & Provider Integration**
   - Implement LLM provider routing and client integrations.
   - Create generation pipeline and prompt engineering for Jira-formatted test cases.
4. **Phase 4: Testing & Polish**
   - Validate functional and non-functional test case generation.
   - Refine UI aesthetics according to design guidelines.

## Goals
- Provide a rich, dynamic, and premium UI for configuration and text input.
- Flexibly integrate with multiple cloud and local LLMs.
- Produce high-quality, Jira-ready test cases.

## Checklists
- [ ] Blueprint Approved by User
- [ ] Initialize frontend and backend
- [ ] Implement Settings UI for LLM API keys
- [ ] Implement Main Generation UI
- [ ] Implement backend API routing for LLM generation
- [ ] Develop prompt templates for test generation
