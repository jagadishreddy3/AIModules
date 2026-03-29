// Part 4: Environment, Criteria, Schedule, Roles, Risks, Defects, Deliverables, Approvals + SAVE
const { Document, Packer } = require("docx");
const fs = require("fs");
const { hdr, para, bullet, makeTable, pageBreak, HeadingLevel } = global.__docHelpers;
const children = global.__docChildren;

// 8. TEST ENVIRONMENT
children.push(pageBreak(), hdr("8. Test Environment"));
children.push(hdr("8.1 Browser Matrix", HeadingLevel.HEADING_2));
children.push(makeTable(["Browser","Versions","Priority"],[
  ["Google Chrome","Latest, Latest-1","Critical"],["Mozilla Firefox","Latest, Latest-1","High"],
  ["Microsoft Edge","Latest, Latest-1","High"],["Apple Safari","Latest, Latest-1","High"],
  ["Samsung Internet","Latest","Medium"],
]));
children.push(hdr("8.2 Operating Systems", HeadingLevel.HEADING_2));
children.push(makeTable(["OS","Versions","Priority"],[
  ["Windows","10, 11","Critical"],["macOS","Ventura, Sonoma, Sequoia","High"],
  ["iOS","16, 17, 18","High"],["Android","13, 14, 15","High"],
]));
children.push(hdr("8.3 Device Types", HeadingLevel.HEADING_2));
children.push(makeTable(["Device Type","Examples","Priority"],[
  ["Desktop","1920x1080, 1366x768, 2560x1440","Critical"],
  ["Tablet","iPad (768x1024), Android Tab","High"],
  ["Mobile","iPhone (375x812), Android (360x800)","High"],
]));
children.push(hdr("8.4 Network Conditions", HeadingLevel.HEADING_2));
children.push(makeTable(["Condition","Specification","Purpose"],[
  ["High-speed (4G/5G)","≥ 10 Mbps","Baseline performance"],
  ["Standard 3G","~1.5 Mbps","Slow network validation"],
  ["Offline/Flaky","Intermittent","Error handling validation"],
]));
children.push(hdr("8.5 Test Tools", HeadingLevel.HEADING_2));
children.push(makeTable(["Tool Category","Tool(s)","Purpose"],[
  ["Test Management","Jira / Azure DevOps / TestRail","Test case mgmt, defect tracking"],
  ["Functional Automation","Selenium WebDriver / Cypress","Automated regression"],
  ["API Testing","Postman / REST Assured","SSO, token, integration testing"],
  ["Security Testing","OWASP ZAP / Burp Suite","Vulnerability scanning"],
  ["Performance Testing","Apache JMeter / k6","Load and stress testing"],
  ["Accessibility","Axe DevTools / WAVE / NVDA","WCAG compliance"],
  ["Visual Regression","Percy / BackstopJS","UI visual consistency"],
  ["Browser Testing","BrowserStack / Sauce Labs","Cross-browser/device testing"],
  ["Monitoring","Lighthouse / WebPageTest","Page performance auditing"],
]));
children.push(hdr("8.6 Test Data Requirements", HeadingLevel.HEADING_2));
children.push(makeTable(["Data Type","Description"],[
  ["Valid user accounts","Active accounts with known credentials"],
  ["Invalid credentials","Incorrect email/password combinations"],
  ["MFA-enabled accounts","Accounts with 2FA configured"],
  ["SSO-enabled accounts","Enterprise accounts linked to IdP"],
  ["Social login accounts","Google and Microsoft test accounts"],
  ["Locked/suspended accounts","Accounts in various states"],
  ["New/unregistered emails","For registration and recovery testing"],
]));

// 9. ENTRY AND EXIT CRITERIA
children.push(pageBreak(), hdr("9. Entry and Exit Criteria"));
children.push(hdr("9.1 Entry Criteria", HeadingLevel.HEADING_2));
children.push(makeTable(["#","Criterion"],[
  ["1","Development complete and code deployed to test environment"],
  ["2","Unit test pass rate ≥ 90%"],
  ["3","Test environment provisioned, stable, mirrors production"],
  ["4","Test data created and available"],
  ["5","Test plan and test cases reviewed and approved"],
  ["6","No critical/blocker defects from previous phase remain open"],
  ["7","Access credentials for all tools and environments available"],
]));
children.push(hdr("9.2 Exit Criteria", HeadingLevel.HEADING_2));
children.push(makeTable(["#","Criterion"],[
  ["1","100% of Critical priority test scenarios executed"],
  ["2","95% of High priority test scenarios executed"],
  ["3","90% of Medium priority test scenarios executed"],
  ["4","0 open Critical severity defects"],
  ["5","0 open High severity defects (or approved deferral)"],
  ["6","All security test scenarios passed"],
  ["7","Performance KPIs met (page load < 2s, concurrent user targets)"],
  ["8","Accessibility audit passed (WCAG 2.1 AA)"],
  ["9","UAT sign-off obtained from Product Manager"],
  ["10","Test summary report generated and reviewed"],
]));
children.push(hdr("9.3 Suspension Criteria", HeadingLevel.HEADING_2));
children.push(makeTable(["#","Criterion"],[
  ["1","Test environment becomes unstable or unavailable"],
  ["2","Critical blocker defect prevents further execution"],
  ["3","> 30% of test cases fail due to single root cause"],
  ["4","Major scope change or requirement modification"],
]));
children.push(hdr("9.4 Resumption Criteria", HeadingLevel.HEADING_2));
children.push(makeTable(["#","Criterion"],[
  ["1","Root cause of suspension resolved and verified"],
  ["2","Test environment restored and validated"],
  ["3","Impacted test cases re-baselined if necessary"],
]));

// 10. TEST SCHEDULE
children.push(pageBreak(), hdr("10. Test Schedule and Milestones"));
children.push(hdr("10.1 Phase 1 — Core Authentication", HeadingLevel.HEADING_2));
children.push(makeTable(["Milestone","Duration","Deliverable"],[
  ["Test Planning & Design","Week 1-2","Test plan, test cases"],
  ["Functional Testing","Week 3-4","REQ-001 to REQ-011 validated"],
  ["Security Testing (Core)","Week 4-5","REQ-021 to REQ-024, REQ-027"],
  ["Defect Fix & Retest","Week 5-6","Defect resolution"],
  ["Phase 1 Sign-off","Week 6","Test summary report"],
]));
children.push(hdr("10.2 Phase 2 — Enhanced UX", HeadingLevel.HEADING_2));
children.push(makeTable(["Milestone","Duration","Deliverable"],[
  ["Test Case Update","Week 7","Updated test cases"],
  ["UI/UX Testing","Week 7-8","REQ-012 to REQ-020 validated"],
  ["Accessibility Testing","Week 8-9","REQ-016 to REQ-018, WCAG audit"],
  ["Performance Testing","Week 9-10","REQ-028 to REQ-033 validated"],
  ["Regression Testing","Week 10","Full regression cycle"],
  ["Phase 2 Sign-off","Week 10","Test summary report"],
]));
children.push(hdr("10.3 Phase 3 — Enterprise Features", HeadingLevel.HEADING_2));
children.push(makeTable(["Milestone","Duration","Deliverable"],[
  ["Test Case Update","Week 11","Updated test cases"],
  ["Integration Testing","Week 11-12","REQ-034 to REQ-039 validated"],
  ["Enterprise SSO/Security","Week 12-13","REQ-004, REQ-025, REQ-026"],
  ["E2E User Journey Testing","Week 13","REQ-040 to REQ-042 validated"],
  ["Full Regression","Week 14","Complete regression cycle"],
  ["UAT","Week 14-15","Stakeholder validation"],
  ["Final Sign-off","Week 15","Final test summary report"],
]));

// 11. ROLES
children.push(pageBreak(), hdr("11. Roles and Responsibilities"));
children.push(makeTable(["Role","Responsibilities","RACI"],[
  ["QA Lead","Test plan, strategy, resource allocation, risk mgmt, reporting","A, R"],
  ["QA Engineer (Functional)","Test case design, manual testing, defect reporting","R"],
  ["QA Engineer (Automation)","Automation framework, regression suite, CI/CD","R"],
  ["Security Tester","Security testing, vulnerability assessment, OWASP","R"],
  ["Performance Tester","Load/stress testing, benchmarking, CDN validation","R"],
  ["Accessibility Tester","WCAG audit, screen reader testing, contrast","R"],
  ["Development Lead","Bug fixes, unit testing, code reviews, QA support","C"],
  ["Product Manager","Requirements, UAT, exit criteria sign-off","A"],
  ["DevOps Lead","Test environment, CI/CD pipeline, monitoring","R, C"],
  ["UX Designer","Design specs, visual regression review","C"],
]));
children.push(para("RACI Key: R = Responsible, A = Accountable, C = Consulted, I = Informed"));

// 12. RISK ASSESSMENT
children.push(pageBreak(), hdr("12. Risk Assessment and Mitigation"));
children.push(makeTable(["RSK ID","Risk Description","Probability","Impact","Mitigation Strategy"],[
  ["RSK-001","Test environment instability/downtime","Medium","High","Backup env; automated health checks; escalation"],
  ["RSK-002","Delayed dev delivery affecting schedule","Medium","High","Buffer weeks; parallel test design during dev"],
  ["RSK-003","Third-party SSO sandbox unavailability","Medium","Medium","Mock SSO responses; escalate early"],
  ["RSK-004","Insufficient test data for edge cases","Low","Medium","Comprehensive data matrix upfront"],
  ["RSK-005","Security vulnerabilities discovered late","Medium","Critical","Shift-left security; SAST/DAST in CI/CD"],
  ["RSK-006","Accessibility issues requiring rework","Medium","High","Early a11y review in Phase 2; dev training"],
  ["RSK-007","Performance degradation under load","Medium","High","Early load testing; CDN; auto-scaling"],
  ["RSK-008","Cross-browser compatibility issues","Medium","Medium","Cloud device lab; prioritize top browsers"],
  ["RSK-009","Requirement changes mid-cycle","Low","High","Change control; impact analysis first"],
  ["RSK-010","Resource unavailability","Low","Medium","Cross-train team; backup plan"],
]));

// 13. DEFECT MANAGEMENT
children.push(pageBreak(), hdr("13. Defect Management"));
children.push(hdr("13.1 Severity Classification", HeadingLevel.HEADING_2));
children.push(makeTable(["Severity","Definition","Example"],[
  ["S1 — Critical","System crash, data loss, security breach; no workaround","Login non-functional; password leak"],
  ["S2 — High","Major feature broken; workaround exists","SSO fails; reset email not sent"],
  ["S3 — Medium","Minor feature issue; workaround available","Password strength not updating"],
  ["S4 — Low","Cosmetic issue; visual/text defect","Typo in error message"],
]));
children.push(hdr("13.2 Priority Classification", HeadingLevel.HEADING_2));
children.push(makeTable(["Priority","Definition","Resolution SLA"],[
  ["P1 — Urgent","Must fix immediately; blocks testing","Within 24 hours"],
  ["P2 — High","Must fix in current sprint","Within 3 days"],
  ["P3 — Medium","Should fix before release","Within 1 week"],
  ["P4 — Low","Can defer to next release","Next release cycle"],
]));
children.push(hdr("13.3 Defect Lifecycle", HeadingLevel.HEADING_2));
children.push(para("New → Assigned → In Progress → Fixed → Ready for Retest → Retest → Closed"));
children.push(para("(Rejected branch from Fixed; Reopened branch from Retest → In Progress)"));
children.push(hdr("13.4 Defect Report Template", HeadingLevel.HEADING_2));
children.push(makeTable(["Field","Description"],[
  ["Defect ID","Auto-generated unique identifier"],["Title","Clear, concise summary"],
  ["Severity","S1 / S2 / S3 / S4"],["Priority","P1 / P2 / P3 / P4"],
  ["Module","Authentication / Validation / UX / Security / Performance"],
  ["Environment","Browser, OS, device, build version"],
  ["Steps to Reproduce","Numbered step-by-step reproduction"],
  ["Expected Result","Per PRD requirements"],["Actual Result","What actually happened"],
  ["Attachments","Screenshots, logs, video recordings"],
  ["Linked REQ/TS","Mapped REQ-xxx and TS-xxx references"],
  ["Assigned To","Developer name"],["Reported By","QA engineer name"],
  ["Date Reported","YYYY-MM-DD"],
]));

// 14. TEST DELIVERABLES
children.push(pageBreak(), hdr("14. Test Deliverables"));
children.push(makeTable(["DEL ID","Deliverable","Phase","Owner"],[
  ["DEL-001","Test Plan Document (this document)","Planning","QA Lead"],
  ["DEL-002","Test Cases / Test Scripts","Each Phase","QA Team"],
  ["DEL-003","Requirements Traceability Matrix","Each Phase","QA Lead"],
  ["DEL-004","Test Environment Setup Report","Pre-Phase 1","DevOps"],
  ["DEL-005","Test Data Preparation Document","Pre-Phase 1","QA Team"],
  ["DEL-006","Daily Test Execution Reports","Each Phase","QA Team"],
  ["DEL-007","Defect Reports","Each Phase","QA Team"],
  ["DEL-008","Defect Summary / Metrics Report","Phase End","QA Lead"],
  ["DEL-009","Security Test Report","Phase 1, 3","Security"],
  ["DEL-010","Performance Test Report","Phase 2","Perf Team"],
  ["DEL-011","Accessibility Audit Report","Phase 2","A11y Team"],
  ["DEL-012","Regression Test Report","Phase 2, 3","QA Team"],
  ["DEL-013","UAT Sign-off Report","Phase 3","PM"],
  ["DEL-014","Final Test Summary Report","Phase 3","QA Lead"],
]));

// 15. APPROVALS
children.push(pageBreak(), hdr("15. Approvals"));
children.push(makeTable(["Approver","Role","Signature","Date"],[
  ["","QA Lead","",""],["","Development Lead","",""],
  ["","Product Manager","",""],["","Security Lead","",""],
  ["","DevOps Lead","",""],
]));

// FOOTER
children.push(para(""));
children.push(para("— End of Test Plan —", true));
children.push(para("Document ID: TP-VWO-LOGIN-2026-001  |  Version: 1.0  |  Classification: Internal — Confidential"));

// BUILD AND SAVE
const doc = new Document({
  sections: [{ children }],
  styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("c:\\Users\\HOME\\Documents\\TestCaseGen_AntiGravity\\TestPlan\\TestPlan_VWO_Login_Dashboard.docx", buffer);
  console.log("SUCCESS: TestPlan_VWO_Login_Dashboard.docx created!");
});
