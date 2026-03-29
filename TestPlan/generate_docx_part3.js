// Part 3: RTM
const { hdr, makeTable, pageBreak, HeadingLevel } = global.__docHelpers;
const children = global.__docChildren;

children.push(pageBreak(), hdr("7. Requirements Traceability Matrix (RTM)"));

children.push(hdr("7.1 Authentication System", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-001","Email/password login","TS-001","Verify successful login with valid email and password","Functional","Critical"],
  ["REQ-001","Email/password login","TS-002","Verify login failure with invalid email","Functional","Critical"],
  ["REQ-001","Email/password login","TS-003","Verify login failure with invalid password","Functional","Critical"],
  ["REQ-001","Email/password login","TS-004","Verify login failure with empty email field","Functional","High"],
  ["REQ-001","Email/password login","TS-005","Verify login failure with empty password field","Functional","High"],
  ["REQ-001","Email/password login","TS-006","Verify login failure with both fields empty","Functional","High"],
  ["REQ-001","Email/password login","TS-007","Verify login with SQL injection attempt in email","Security","Critical"],
  ["REQ-001","Email/password login","TS-008","Verify login with XSS attempt in input fields","Security","Critical"],
  ["REQ-002","Session management","TS-009","Verify session created after successful login","Functional","Critical"],
  ["REQ-002","Session management","TS-010","Verify session timeout after idle period","Functional","High"],
  ["REQ-002","Session management","TS-011","Verify session invalidation on logout","Functional","Critical"],
  ["REQ-002","Session management","TS-012","Verify concurrent session handling","Functional","High"],
  ["REQ-003","MFA","TS-013","Verify MFA prompt after valid credentials","Functional","High"],
  ["REQ-003","MFA","TS-014","Verify successful login after valid MFA code","Functional","High"],
  ["REQ-003","MFA","TS-015","Verify login blocked with invalid MFA code","Functional","High"],
  ["REQ-003","MFA","TS-016","Verify MFA code expiry behavior","Functional","Medium"],
  ["REQ-004","SSO","TS-017","Verify SSO redirects to identity provider","Integration","High"],
  ["REQ-004","SSO","TS-018","Verify successful login via SAML-based SSO","Integration","High"],
  ["REQ-004","SSO","TS-019","Verify successful login via OAuth-based SSO","Integration","High"],
  ["REQ-004","SSO","TS-020","Verify SSO failure with invalid/expired token","Integration","High"],
]));

children.push(hdr("7.2 User Input Validation", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-005","Real-time validation","TS-021","Verify validation triggers on email field blur","Functional","High"],
  ["REQ-005","Real-time validation","TS-022","Verify validation triggers on password field blur","Functional","High"],
  ["REQ-006","Email format","TS-023","Verify error for malformed email","Functional","High"],
  ["REQ-006","Email format","TS-024","Verify acceptance of valid email formats","Functional","High"],
  ["REQ-006","Email format","TS-025","Verify specialized keyboard on mobile","UI/UX","Medium"],
  ["REQ-007","Password strength","TS-026","Verify weak password indicator display","Functional","Medium"],
  ["REQ-007","Password strength","TS-027","Verify strong password indicator display","Functional","Medium"],
  ["REQ-008","Error messages","TS-028","Verify error message for invalid credentials","Functional","High"],
  ["REQ-008","Error messages","TS-029","Verify error message for locked account","Functional","High"],
  ["REQ-008","Error messages","TS-030","Verify error msgs don't expose sensitive info","Security","Critical"],
]));

children.push(hdr("7.3 Password Management", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-009","Forgot password","TS-031","Verify Forgot Password link navigates to reset","Functional","Critical"],
  ["REQ-009","Forgot password","TS-032","Verify reset email sent for valid email","Functional","Critical"],
  ["REQ-009","Forgot password","TS-033","Verify secure token is unique and time-limited","Security","Critical"],
  ["REQ-009","Forgot password","TS-034","Verify reset token cannot be reused","Security","Critical"],
  ["REQ-010","Email recovery","TS-035","Verify password recovery email delivery","Functional","Critical"],
  ["REQ-010","Email recovery","TS-036","Verify behavior for non-registered email","Functional","High"],
  ["REQ-011","Password complexity","TS-037","Verify rejection below minimum length","Functional","High"],
  ["REQ-011","Password complexity","TS-038","Verify rejection missing character types","Functional","High"],
  ["REQ-011","Password complexity","TS-039","Verify acceptance when rules are met","Functional","High"],
]));

children.push(hdr("7.4 Interface Design", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-012","Responsive design","TS-040","Verify layout on desktop (1920x1080)","UI/UX","High"],
  ["REQ-012","Responsive design","TS-041","Verify layout on tablet (768x1024)","UI/UX","High"],
  ["REQ-012","Responsive design","TS-042","Verify layout on mobile (375x667)","UI/UX","High"],
  ["REQ-012","Responsive design","TS-043","Verify touch-friendly controls on mobile","UI/UX","Medium"],
  ["REQ-013","Auto-focus","TS-044","Verify cursor auto-focuses on email field","UI/UX","Medium"],
  ["REQ-014","Clickable labels","TS-045","Verify clicking label focuses input field","UI/UX","Medium"],
  ["REQ-015","Loading states","TS-046","Verify loading indicator during auth","UI/UX","Medium"],
  ["REQ-015","Loading states","TS-047","Verify submit button disabled during loading","UI/UX","Medium"],
]));

children.push(hdr("7.5 Accessibility", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-016","Screen reader","TS-048","Verify ARIA labels on all form elements","Accessibility","High"],
  ["REQ-016","Screen reader","TS-049","Verify screen reader reads errors correctly","Accessibility","High"],
  ["REQ-017","High contrast","TS-050","Verify elements visible in high contrast mode","Accessibility","Medium"],
  ["REQ-017","High contrast","TS-051","Verify contrast ratio meets WCAG 4.5:1","Accessibility","Medium"],
  ["REQ-018","Keyboard nav","TS-052","Verify Tab navigates all elements","Accessibility","High"],
  ["REQ-018","Keyboard nav","TS-053","Verify Enter submits login form","Accessibility","High"],
  ["REQ-018","Keyboard nav","TS-054","Verify visible focus indicators","Accessibility","High"],
]));

children.push(hdr("7.6 Branding and Visual", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-019","Brand consistency","TS-055","Verify VWO logo, colors, typography","UI/UX","Medium"],
  ["REQ-020","Light/Dark mode","TS-056","Verify page renders correctly in Light mode","UI/UX","High"],
  ["REQ-020","Light/Dark mode","TS-057","Verify page renders correctly in Dark mode","UI/UX","High"],
  ["REQ-020","Light/Dark mode","TS-058","Verify theme toggle/switch functionality","Functional","High"],
  ["REQ-020","Light/Dark mode","TS-059","Verify theme preference persistence","Functional","Medium"],
]));

children.push(hdr("7.7 Security — Data Protection", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-021","E2E encryption","TS-060","Verify credentials encrypted in transit","Security","Critical"],
  ["REQ-022","Password hashing","TS-061","Verify passwords hashed, not plaintext in DB","Security","Critical"],
  ["REQ-023","Session tokens","TS-062","Verify tokens are random and non-predictable","Security","Critical"],
  ["REQ-023","Session tokens","TS-063","Verify tokens invalidated on logout","Security","Critical"],
  ["REQ-024","HTTPS","TS-064","Verify HTTP redirects to HTTPS","Security","Critical"],
  ["REQ-024","HTTPS","TS-065","Verify valid SSL/TLS certificate","Security","Critical"],
]));

children.push(hdr("7.8 Security — Compliance", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-025","GDPR","TS-066","Verify privacy policy link on login page","Compliance","Critical"],
  ["REQ-025","GDPR","TS-067","Verify cookie consent on first visit","Compliance","Critical"],
  ["REQ-025","GDPR","TS-068","Verify no PII in browser console/network","Compliance","Critical"],
  ["REQ-026","Enterprise security","TS-069","Verify IP whitelisting support","Security","High"],
  ["REQ-026","Enterprise security","TS-070","Verify audit trail for login events","Security","High"],
  ["REQ-027","Rate limiting","TS-071","Verify lockout after N failed attempts","Security","Critical"],
  ["REQ-027","Rate limiting","TS-072","Verify CAPTCHA after failed threshold","Security","Critical"],
  ["REQ-027","Rate limiting","TS-073","Verify rate limiting on reset endpoint","Security","High"],
]));

children.push(hdr("7.9 Performance", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-028","Page load < 2s","TS-074","Verify load time on 4G connection","Performance","Critical"],
  ["REQ-028","Page load < 2s","TS-075","Verify load time on 3G connection","Performance","High"],
  ["REQ-029","Asset optimization","TS-076","Verify images compressed, CSS/JS minified","Performance","High"],
  ["REQ-029","Asset optimization","TS-077","Verify no render-blocking resources","Performance","Medium"],
  ["REQ-030","CDN","TS-078","Verify static assets served via CDN","Performance","High"],
  ["REQ-031","99.9% uptime","TS-079","Verify availability monitoring in place","Performance","Critical"],
  ["REQ-032","Concurrent users","TS-080","Verify under 1,000 concurrent users","Performance","High"],
  ["REQ-032","Concurrent users","TS-081","Verify under 5,000 concurrent users","Performance","High"],
  ["REQ-033","Multi-region","TS-082","Verify load from North America","Performance","High"],
  ["REQ-033","Multi-region","TS-083","Verify load from Europe","Performance","High"],
  ["REQ-033","Multi-region","TS-084","Verify load from Asia-Pacific","Performance","High"],
]));

children.push(hdr("7.10 Integrations", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-034","Dashboard transition","TS-085","Verify redirect to dashboard after login","Integration","Critical"],
  ["REQ-034","Dashboard transition","TS-086","Verify user context loads on dashboard","Integration","High"],
  ["REQ-035","Analytics","TS-087","Verify login success event tracked","Integration","Medium"],
  ["REQ-035","Analytics","TS-088","Verify login failure event tracked","Integration","Medium"],
  ["REQ-036","Support","TS-089","Verify support link on login page","Integration","Medium"],
  ["REQ-037","Enterprise SSO","TS-090","Verify SAML assertion processing","Integration","High"],
  ["REQ-037","Enterprise SSO","TS-091","Verify OAuth token exchange","Integration","High"],
  ["REQ-038","Social login","TS-092","Verify login via Google account","Integration","High"],
  ["REQ-038","Social login","TS-093","Verify login via Microsoft account","Integration","High"],
  ["REQ-038","Social login","TS-094","Verify behavior when provider unavailable","Integration","Medium"],
  ["REQ-039","Marketing tools","TS-095","Verify onboarding for first-time login","Integration","Medium"],
]));

children.push(hdr("7.11 User Journeys (E2E)", HeadingLevel.HEADING_2));
children.push(makeTable(["REQ ID","Requirement","TS ID","Test Scenario","Test Type","Priority"],[
  ["REQ-040","New user","TS-096","E2E: Land → signup → register → onboard","E2E","High"],
  ["REQ-040","New user","TS-097","Verify free trial CTA is visible and functional","Functional","High"],
  ["REQ-041","Returning user","TS-098","E2E: Remember Me → auto-fill → login → dashboard","E2E","Critical"],
  ["REQ-041","Returning user","TS-099","Verify Remember Me persists credentials","Functional","High"],
  ["REQ-041","Returning user","TS-100","Verify session restores previous context","Functional","Medium"],
  ["REQ-042","Error recovery","TS-101","E2E: Failed login → error → password reset","E2E","High"],
  ["REQ-042","Error recovery","TS-102","Verify multiple recovery paths available","Functional","High"],
  ["REQ-042","Error recovery","TS-103","Verify success confirmation after recovery","Functional","Medium"],
]));

global.__docChildren = children;
console.log("Part 3 done: RTM built (TS-001 to TS-103)");
