const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType, PageBreak } = require("docx");
const fs = require("fs");

// --- Color Palette ---
const HEADER_BG = "1F3864";
const HEADER_TEXT = "FFFFFF";
const ALT_ROW = "D6E4F0";
const BORDER = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER };

// --- Helpers ---
function hdr(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ text, heading: level, spacing: { before: 300, after: 150 } });
}
function para(text, bold = false) {
  return new Paragraph({ children: [new TextRun({ text, bold, size: 22, font: "Calibri" })], spacing: { after: 80 } });
}
function bullet(text) {
  return new Paragraph({ children: [new TextRun({ text, size: 22, font: "Calibri" })], bullet: { level: 0 }, spacing: { after: 40 } });
}
function cell(text, opts = {}) {
  const isHeader = opts.header || false;
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text: text || "", bold: isHeader, size: 20, font: "Calibri", color: isHeader ? HEADER_TEXT : "000000" })], alignment: AlignmentType.LEFT })],
    shading: isHeader ? { type: ShadingType.SOLID, color: HEADER_BG } : (opts.alt ? { type: ShadingType.SOLID, color: ALT_ROW } : undefined),
    borders: BORDERS, width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
  });
}
function headerRow(cols) { return new TableRow({ children: cols.map(c => cell(c, { header: true })), tableHeader: true }); }
function dataRow(cols, alt = false) { return new TableRow({ children: cols.map(c => cell(c, { alt })) }); }
function makeTable(headers, rows) {
  return new Table({ rows: [headerRow(headers), ...rows.map((r, i) => dataRow(r, i % 2 === 1))], width: { size: 100, type: WidthType.PERCENTAGE } });
}
function pageBreak() { return new Paragraph({ children: [new PageBreak()] }); }

// --- Build Sections ---
const children = [];

// TITLE
children.push(new Paragraph({ children: [new TextRun({ text: "TEST PLAN", bold: true, size: 48, font: "Calibri", color: HEADER_BG })], alignment: AlignmentType.CENTER, spacing: { before: 600, after: 100 } }));
children.push(new Paragraph({ children: [new TextRun({ text: "VWO Login Dashboard — app.vwo.com", bold: true, size: 32, font: "Calibri", color: "333333" })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }));
children.push(new Paragraph({ children: [new TextRun({ text: "Document ID: TP-VWO-LOGIN-2026-001  |  Version: 1.0  |  Classification: Internal — Confidential", size: 20, font: "Calibri", color: "666666" })], alignment: AlignmentType.CENTER, spacing: { after: 400 } }));

// 1. DOCUMENT CONTROL
children.push(pageBreak(), hdr("1. Document Control"));
children.push(makeTable(["Field", "Details"], [
  ["Document ID", "TP-VWO-LOGIN-2026-001"], ["Document Title", "Test Plan — VWO Login Dashboard"],
  ["Version", "1.0"], ["Author", "QA Lead"], ["Date Created", "2026-03-20"],
  ["Date Modified", "2026-03-20"], ["Status", "Draft"],
  ["PRD Reference", "PRD — VWO Login Dashboard (PRD.txt)"], ["Classification", "Internal — Confidential"],
]));

children.push(hdr("1.1 Revision History", HeadingLevel.HEADING_2));
children.push(makeTable(["Version", "Date", "Author", "Description"], [
  ["0.1", "2026-03-20", "QA Lead", "Initial draft"],
  ["1.0", "2026-03-20", "QA Lead", "Baseline release for stakeholder review"],
]));

children.push(hdr("1.2 Distribution List", HeadingLevel.HEADING_2));
children.push(makeTable(["Role", "Name", "Purpose"], [
  ["QA Lead", "TBD", "Owner"], ["QA Engineer(s)", "TBD", "Execution"],
  ["Development Lead", "TBD", "Review"], ["Product Manager", "TBD", "Approval"],
  ["Security Engineer", "TBD", "Security Review"], ["DevOps Lead", "TBD", "Environment"],
]));

// 3. INTRODUCTION
children.push(pageBreak(), hdr("2. Introduction"));
children.push(hdr("2.1 Purpose", HeadingLevel.HEADING_2));
children.push(para("This Test Plan defines the testing strategy, scope, approach, resources, schedule, and deliverables for the VWO Login Dashboard at app.vwo.com. It ensures that all functional, non-functional, and compliance requirements identified in the PRD are validated systematically prior to production release."));
children.push(hdr("2.2 Project Overview", HeadingLevel.HEADING_2));
children.push(para("VWO (Visual Website Optimizer) is a digital experience optimization platform used by 4,000+ brands across 90+ countries for A/B testing, conversion rate optimization, and user behavior analysis. The Login Dashboard is the critical entry point for users accessing VWO's suite of experimentation, personalization, and analytics tools."));
children.push(para("Target Users:"));
children.push(bullet("Primary: Digital marketers, product managers, UX designers, developers"));
children.push(bullet("Secondary: Enterprise teams, CRO specialists, data analysts"));
children.push(bullet("Scale: Companies from 50–200 employees to enterprises with 1,000+"));

children.push(hdr("2.3 References", HeadingLevel.HEADING_2));
children.push(makeTable(["Ref ID", "Document", "Version"], [
  ["PRD-001", "Product Requirements Document — VWO Login Dashboard", "1.0"],
  ["STD-001", "IEEE 829-2008 — Standard for Software Test Documentation", "—"],
  ["STD-002", "ISTQB Foundation Level Syllabus", "4.0"],
  ["STD-003", "OWASP Authentication Cheat Sheet", "Latest"],
  ["STD-004", "WCAG 2.1 AA Guidelines", "2.1"],
]));

children.push(hdr("2.4 Definitions and Acronyms", HeadingLevel.HEADING_2));
children.push(makeTable(["Acronym", "Definition"], [
  ["VWO","Visual Website Optimizer"],["PRD","Product Requirements Document"],["RTM","Requirements Traceability Matrix"],
  ["MFA","Multi-Factor Authentication"],["SSO","Single Sign-On"],["SAML","Security Assertion Markup Language"],
  ["OAuth","Open Authorization"],["WCAG","Web Content Accessibility Guidelines"],["GDPR","General Data Protection Regulation"],
  ["CCPA","California Consumer Privacy Act"],["OWASP","Open Web Application Security Project"],
  ["ARIA","Accessible Rich Internet Applications"],["CDN","Content Delivery Network"],["E2E","End-to-End"],
  ["UAT","User Acceptance Testing"],["SLA","Service Level Agreement"],["RACI","Responsible, Accountable, Consulted, Informed"],
]));

// 4. TEST SCOPE
children.push(pageBreak(), hdr("3. Test Scope"));
children.push(hdr("3.1 In-Scope", HeadingLevel.HEADING_2));
children.push(makeTable(["Scope Area", "PRD Section Reference"], [
  ["Email/Password Authentication","Functional Requirements — Login Process"],
  ["Session Management","Functional Requirements — Login Process"],
  ["Multi-Factor Authentication (MFA)","Functional Requirements — Login Process"],
  ["Single Sign-On (SSO)","Functional Requirements — Login Process"],
  ["User Input Validation","Functional Requirements — User Input Validation"],
  ["Password Management (Forgot/Reset)","Functional Requirements — Password Management"],
  ["Responsive/Mobile Design","UX Features — Interface Design"],
  ["Accessibility (WCAG 2.1 AA)","UX Features — Accessibility"],
  ["Light/Dark Theme","UX Features — Branding & Visual Design"],
  ["Data Encryption (E2E, HTTPS)","Technical Requirements — Security"],
  ["GDPR/CCPA Compliance","Technical Requirements — Compliance"],
  ["Rate Limiting / Brute Force Protection","Technical Requirements — Compliance"],
  ["Page Load Performance (< 2s)","Technical Requirements — Performance"],
  ["Scalability / High Availability","Technical Requirements — Performance"],
  ["Platform Integrations","Integration Requirements"],
  ["Third-Party SSO & Social Login","Integration Requirements"],
  ["New User Journey","User Journey & Flow"],
  ["Returning User Journey","User Journey & Flow"],
  ["Error Recovery Flow","User Journey & Flow"],
]));

children.push(hdr("3.2 Out-of-Scope", HeadingLevel.HEADING_2));
children.push(makeTable(["Excluded Area", "Justification"], [
  ["VWO Core Platform (post-login features)","Covered by separate test plans"],
  ["Biometric Authentication","Future Enhancement in PRD"],
  ["Adaptive/Risk-Based Authentication","Future Enhancement in PRD"],
  ["Progressive Web App (PWA)","Future Enhancement in PRD"],
  ["A/B Testing of Login Experience","Future Enhancement — analytics optimization"],
  ["Backend Infrastructure Testing","Covered by DevOps/Infrastructure test plan"],
  ["Third-party service internal reliability","Dependent on external providers"],
]));

children.push(hdr("3.3 Assumptions", HeadingLevel.HEADING_2));
children.push(bullet("A stable test environment mirroring production will be available before test execution begins."));
children.push(bullet("Test data (valid/invalid user accounts, SSO-enabled accounts) will be provisioned prior to testing."));
children.push(bullet("Access to third-party SSO sandbox environments (Google, Microsoft) will be provided."));
children.push(bullet("The PRD (Version 1.0) is the approved and baseline requirements document."));
children.push(bullet("Development will follow the three-phase delivery model outlined in the PRD."));

children.push(hdr("3.4 Constraints", HeadingLevel.HEADING_2));
children.push(bullet("Testing timelines are dependent on development delivery dates per phase."));
children.push(bullet("Security and penetration testing require specialized tools and may need external vendor support."));
children.push(bullet("Performance testing under geo-distributed conditions requires multi-region test infrastructure."));
children.push(bullet("GDPR/CCPA compliance validation may require legal team consultation."));

// 5. TEST STRATEGY
children.push(pageBreak(), hdr("4. Test Strategy"));
children.push(hdr("4.1 Testing Types", HeadingLevel.HEADING_2));
children.push(makeTable(["#", "Testing Type", "Objective", "Tools / Approach"], [
  ["1","Functional Testing","Validate all login, validation, password, and session features","Manual + Selenium/Cypress"],
  ["2","UI/UX Testing","Verify responsive design, themes, loading states, visual consistency","Manual + Visual regression"],
  ["3","Security Testing","Validate encryption, rate limiting, session security, OWASP","OWASP ZAP, Burp Suite"],
  ["4","Performance Testing","Validate < 2s page load, concurrent users, CDN, HA","JMeter, Lighthouse"],
  ["5","Accessibility Testing","Validate WCAG 2.1 AA, screen reader, keyboard nav","Axe, WAVE, NVDA"],
  ["6","Integration Testing","Validate SSO, social login, dashboard transition, analytics","Manual + Postman"],
  ["7","Regression Testing","Ensure existing functionality is unaffected after changes","Automated suite"],
  ["8","UAT Testing","End-user validation of login experience","Manual — stakeholder-driven"],
]));

children.push(hdr("4.2 Testing Levels", HeadingLevel.HEADING_2));
children.push(makeTable(["Level", "Description"], [
  ["Unit Testing","Performed by development team (out of QA scope)"],
  ["Component Testing","Individual feature testing (login form, password reset, etc.)"],
  ["Integration Testing","Cross-component and third-party integration validation"],
  ["System Testing","End-to-end validation of complete login flows"],
  ["Acceptance Testing","Stakeholder sign-off based on business requirements"],
]));

children.push(hdr("4.3 Test Design Techniques", HeadingLevel.HEADING_2));
children.push(bullet("Equivalence Partitioning (valid/invalid inputs)"));
children.push(bullet("Boundary Value Analysis (field lengths, password complexity)"));
children.push(bullet("Decision Table Testing (login conditions matrix)"));
children.push(bullet("State Transition Testing (session states, account lockout)"));
children.push(bullet("Error Guessing (common edge cases)"));
children.push(bullet("Exploratory Testing (unscripted session-based testing)"));

// Save part1 data to global for part2
global.__docChildren = children;
global.__docHelpers = { hdr, para, bullet, makeTable, pageBreak, HeadingLevel };

console.log("Part 1 done: sections 1-4 built");
