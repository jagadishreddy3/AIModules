// Prompt template for generating Jira-formatted test cases

export function buildTestCasePrompt(requirement: string): string {
  return `You are a strict QA Engineering Lead. Generate a JIRA Wiki Table from the requirement below.

REQUIREMENT:
${requirement}

STRICT OUTPUT RULES (FAILURE TO FOLLOW BREAKS THE EXPORT):
1. USE ONLY ONE JIRA WIKI TABLE.
2. EVERY DATA ROW MUST START AND END WITH A PIPE (|) AND HAVE EXACTLY 11 INTERMEDIATE PIPES (TOTAL 12 COLUMNS).
3. COLUMN ORDER: | Test ID | Summary | Description | Precondition | Test Steps | Expected Result | Priority | Labels / Components | Test Type | PRD Source | Confidence | Status |
4. NO LAYOUT-BREAKING CHARACTERS: 
   - NEVER use the pipe character (|) inside a cell. Use a hyphen (-) instead.
   - NEVER use actual newlines inside a cell. Use \\\\ (double backslash) for logic breaks.
5. CATEGORICAL VALUES (MUST BE EXACT):
   - Priority: [Critical, High, Medium, Low]
   - Test Type: [Functional, Performance, Security, Accessibility, API, UI]
   - Confidence: [High, Medium, Low]
   - Status: Always "To Do"
6. PRD SOURCE: Quote specific section ID or verbatim text from the requirement.

EXAMPLE OF A CORRECT ROW:
| TC-001 | Login Validation | Verify valid login | User at login page | 1. Enter email\\\\2. Enter password\\\\3. Click Login | User redirected to home | Critical | Auth, Security | Functional | Requirement Section 1.2 | High | To Do |

STRICT: Ensure every single row has exactly 12 columns. Do not omit any data. Do not add headers like "h3." except for "h3. Requirement Summary" and "h3. Test Case Table".
`;
}
