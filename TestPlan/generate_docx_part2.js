// Part 2: Features, RTM, Environment, Criteria, Schedule, Roles, Risks, Defects, Deliverables, Approvals
const { hdr, para, bullet, makeTable, pageBreak, HeadingLevel } = global.__docHelpers;
const children = global.__docChildren;

// 5. FEATURES TO BE TESTED
children.push(pageBreak(), hdr("5. Features to be Tested"));
children.push(para("Each feature is assigned a unique requirement ID (REQ-xxx) for traceability."));

children.push(hdr("5.1 Authentication System", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-001","Email and password-based login","Functional Req — Login Process","Critical"],
  ["REQ-002","Session management with configurable timeout","Functional Req — Login Process","Critical"],
  ["REQ-003","Multi-Factor Authentication (MFA)","Functional Req — Login Process","High"],
  ["REQ-004","Single Sign-On (SSO) integration","Functional Req — Login Process","High"],
]));
children.push(hdr("5.2 User Input Validation", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-005","Real-time field validation on blur","Functional Req — Validation","High"],
  ["REQ-006","Email format verification","Functional Req — Validation","High"],
  ["REQ-007","Password strength indicator","Functional Req — Validation","Medium"],
  ["REQ-008","Clear actionable error messages","Functional Req — Validation","High"],
]));
children.push(hdr("5.3 Password Management", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-009","Forgot password flow with token","Functional Req — Password Mgmt","Critical"],
  ["REQ-010","Email-based password recovery","Functional Req — Password Mgmt","Critical"],
  ["REQ-011","Password complexity enforcement","Functional Req — Password Mgmt","High"],
]));
children.push(hdr("5.4 Interface Design", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-012","Responsive/mobile-optimized design","UX — Interface Design","High"],
  ["REQ-013","Auto-focus on first input field","UX — Interface Design","Medium"],
  ["REQ-014","Clickable form labels","UX — Interface Design","Medium"],
  ["REQ-015","Loading state indicators","UX — Interface Design","Medium"],
]));
children.push(hdr("5.5 Accessibility", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-016","Screen reader support (ARIA labels)","UX — Accessibility","High"],
  ["REQ-017","High contrast mode","UX — Accessibility","Medium"],
  ["REQ-018","Full keyboard navigation","UX — Accessibility","High"],
]));
children.push(hdr("5.6 Branding and Visual Design", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-019","Brand consistency with VWO design system","UX — Branding","Medium"],
  ["REQ-020","Light and Dark mode theme support","UX — Branding","High"],
]));
children.push(hdr("5.7 Security — Data Protection", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-021","End-to-end encryption for auth data","Technical — Data Protection","Critical"],
  ["REQ-022","Encrypted password storage (hashing)","Technical — Data Protection","Critical"],
  ["REQ-023","Secure session token management","Technical — Data Protection","Critical"],
  ["REQ-024","HTTPS enforcement (SSL/TLS)","Technical — Data Protection","Critical"],
]));
children.push(hdr("5.8 Security — Compliance", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-025","GDPR compliance for user data","Technical — Compliance","Critical"],
  ["REQ-026","Enterprise security policy support","Technical — Compliance","High"],
  ["REQ-027","Rate limiting (brute force protection)","Technical — Compliance","Critical"],
]));
children.push(hdr("5.9 Performance", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-028","Page load within 2 seconds","Technical — Load Time","Critical"],
  ["REQ-029","Asset optimization (compressed/minified)","Technical — Load Time","High"],
  ["REQ-030","CDN integration for global performance","Technical — Load Time","High"],
  ["REQ-031","99.9% uptime availability","Technical — Scalability","Critical"],
  ["REQ-032","Concurrent user support (thousands)","Technical — Scalability","High"],
  ["REQ-033","Multi-region geographic distribution","Technical — Scalability","High"],
]));
children.push(hdr("5.10 Integrations", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-034","Seamless transition to VWO dashboard","Integration — Platform","Critical"],
  ["REQ-035","Login analytics tracking","Integration — Platform","Medium"],
  ["REQ-036","Customer support integration","Integration — Platform","Medium"],
  ["REQ-037","Enterprise SSO (SAML, OAuth)","Integration — Third-Party","High"],
  ["REQ-038","Social login (Google, Microsoft)","Integration — Third-Party","High"],
  ["REQ-039","Marketing/onboarding tool integration","Integration — Third-Party","Medium"],
]));
children.push(hdr("5.11 User Journeys", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Feature","PRD Reference","Priority"],[
  ["REQ-040","New user journey (discovery → signup → onboarding)","User Journey — New User","High"],
  ["REQ-041","Returning user journey (quick login → dashboard)","User Journey — Returning","Critical"],
  ["REQ-042","Error recovery flow","User Journey — Error Recovery","High"],
]));

// 6. FEATURES NOT TO BE TESTED
children.push(pageBreak(), hdr("6. Features NOT to be Tested"));
children.push(makeTable(["Exclusion ID","Feature","Justification"],[
  ["EXC-001","Biometric authentication","PRD classifies as Future Enhancement"],
  ["EXC-002","Adaptive/risk-based authentication","PRD classifies as Future Enhancement"],
  ["EXC-003","Progressive Web App (PWA)","PRD classifies as Future Enhancement"],
  ["EXC-004","A/B testing of login experience","Optimization activity, not functional req"],
  ["EXC-005","User behavior analytics engine","PRD classifies as Future Enhancement"],
  ["EXC-006","Personalization engine","PRD classifies as Future Enhancement"],
  ["EXC-007","VWO core post-login modules","Separate test plan scope"],
  ["EXC-008","Backend infrastructure (servers, DB)","Covered by DevOps/Infra test plan"],
]));

global.__docChildren = children;
console.log("Part 2 done: sections 5-6 built");
