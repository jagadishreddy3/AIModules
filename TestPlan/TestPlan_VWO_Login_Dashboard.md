# TEST PLAN

## VWO Login Dashboard — app.vwo.com

---

## 1. Document Control

| Field               | Details                                          |
|---------------------|--------------------------------------------------|
| **Document ID**     | TP-VWO-LOGIN-2026-001                            |
| **Document Title**  | Test Plan — VWO Login Dashboard                  |
| **Version**         | 1.0                                              |
| **Author**          | QA Lead                                          |
| **Date Created**    | 2026-03-20                                       |
| **Date Modified**   | 2026-03-20                                       |
| **Status**          | Draft                                            |
| **PRD Reference**   | PRD — VWO Login Dashboard (PRD.txt)              |
| **Classification**  | Internal — Confidential                          |

### 1.1 Revision History

| Version | Date       | Author   | Description                          |
|---------|------------|----------|--------------------------------------|
| 0.1     | 2026-03-20 | QA Lead  | Initial draft                        |
| 1.0     | 2026-03-20 | QA Lead  | Baseline release for stakeholder review |

### 1.2 Distribution List

| Role                | Name       | Purpose          |
|---------------------|------------|------------------|
| QA Lead             | TBD        | Owner            |
| QA Engineer(s)      | TBD        | Execution        |
| Development Lead    | TBD        | Review           |
| Product Manager     | TBD        | Approval         |
| Security Engineer   | TBD        | Security Review  |
| DevOps Lead         | TBD        | Environment      |

---

## 2. Table of Contents

1. [Document Control](#1-document-control)
2. [Table of Contents](#2-table-of-contents)
3. [Introduction](#3-introduction)
4. [Test Scope](#4-test-scope)
5. [Test Strategy](#5-test-strategy)
6. [Features to be Tested](#6-features-to-be-tested)
7. [Features NOT to be Tested](#7-features-not-to-be-tested)
8. [Requirements Traceability Matrix (RTM)](#8-requirements-traceability-matrix-rtm)
9. [Test Environment](#9-test-environment)
10. [Entry and Exit Criteria](#10-entry-and-exit-criteria)
11. [Test Schedule and Milestones](#11-test-schedule-and-milestones)
12. [Roles and Responsibilities](#12-roles-and-responsibilities)
13. [Risk Assessment and Mitigation](#13-risk-assessment-and-mitigation)
14. [Defect Management](#14-defect-management)
15. [Test Deliverables](#15-test-deliverables)
16. [Approvals](#16-approvals)

---

## 3. Introduction

### 3.1 Purpose

This Test Plan defines the testing strategy, scope, approach, resources, schedule, and deliverables for the **VWO Login Dashboard** at `app.vwo.com`. It ensures that all functional, non-functional, and compliance requirements identified in the PRD are validated systematically prior to production release.

### 3.2 Project Overview

VWO (Visual Website Optimizer) is a digital experience optimization platform used by 4,000+ brands across 90+ countries for A/B testing, conversion rate optimization, and user behavior analysis. The Login Dashboard is the critical entry point for users accessing VWO's suite of experimentation, personalization, and analytics tools.

**Target Users:**
- **Primary:** Digital marketers, product managers, UX designers, developers at growing businesses
- **Secondary:** Enterprise teams, CRO specialists, data analysts
- **Scale:** Companies from 50-200 employees to large enterprises with 1,000+ employees

### 3.3 References

| Ref ID   | Document                                     | Version |
|----------|----------------------------------------------|---------|
| PRD-001  | Product Requirements Document — VWO Login Dashboard | 1.0     |
| STD-001  | IEEE 829-2008 — Standard for Software Test Documentation | —    |
| STD-002  | ISTQB Foundation Level Syllabus              | 4.0     |
| STD-003  | OWASP Authentication Cheat Sheet             | Latest  |
| STD-004  | WCAG 2.1 AA Guidelines                       | 2.1     |

### 3.4 Definitions and Acronyms

| Acronym | Definition                                       |
|---------|--------------------------------------------------|
| VWO     | Visual Website Optimizer                         |
| PRD     | Product Requirements Document                    |
| RTM     | Requirements Traceability Matrix                 |
| MFA     | Multi-Factor Authentication                      |
| SSO     | Single Sign-On                                   |
| SAML    | Security Assertion Markup Language               |
| OAuth   | Open Authorization                               |
| WCAG    | Web Content Accessibility Guidelines             |
| GDPR    | General Data Protection Regulation               |
| CCPA    | California Consumer Privacy Act                  |
| OWASP   | Open Web Application Security Project            |
| ARIA    | Accessible Rich Internet Applications            |
| CDN     | Content Delivery Network                         |
| E2E     | End-to-End                                       |
| UAT     | User Acceptance Testing                          |
| SLA     | Service Level Agreement                          |
| RACI    | Responsible, Accountable, Consulted, Informed    |

---

## 4. Test Scope

### 4.1 In-Scope

The following areas are within the scope of this test plan, as derived from the PRD:

| Scope Area                   | PRD Section Reference              |
|------------------------------|-------------------------------------|
| Email/Password Authentication | Functional Requirements — Login Process |
| Session Management           | Functional Requirements — Login Process |
| Multi-Factor Authentication (MFA) | Functional Requirements — Login Process |
| Single Sign-On (SSO)        | Functional Requirements — Login Process |
| User Input Validation        | Functional Requirements — User Input Validation |
| Password Management (Forgot/Reset) | Functional Requirements — Password Management |
| Responsive/Mobile Design    | UX Features — Interface Design     |
| Accessibility (WCAG 2.1 AA) | UX Features — Accessibility        |
| Light/Dark Theme             | UX Features — Branding & Visual Design |
| Data Encryption (E2E, HTTPS) | Technical Requirements — Security  |
| GDPR/CCPA Compliance        | Technical Requirements — Compliance |
| Rate Limiting / Brute Force Protection | Technical Requirements — Compliance |
| Page Load Performance (< 2s) | Technical Requirements — Performance |
| Scalability / High Availability | Technical Requirements — Performance |
| Platform Integrations (Dashboard, Analytics) | Integration Requirements |
| Third-Party SSO & Social Login | Integration Requirements          |
| New User Journey (Registration/Onboarding) | User Journey & Flow    |
| Returning User Journey      | User Journey & Flow                |
| Error Recovery Flow          | User Journey & Flow                |

### 4.2 Out-of-Scope

| Excluded Area                          | Justification                                           |
|----------------------------------------|---------------------------------------------------------|
| VWO Core Platform (post-login features) | Covered by separate test plans for individual VWO modules |
| Biometric Authentication              | Listed as "Future Enhancement" in PRD — not in current scope |
| Adaptive/Risk-Based Authentication    | Listed as "Future Enhancement" in PRD — not in current scope |
| Progressive Web App (PWA)             | Listed as "Future Enhancement" in PRD — not in current scope |
| A/B Testing of Login Experience       | Listed as "Future Enhancement" in PRD — analytics optimization |
| Backend Infrastructure Testing        | Covered by DevOps/Infrastructure test plan              |
| Third-party service internal reliability | Dependent on external providers (Google, Microsoft SSO) |

### 4.3 Assumptions

1. A stable test environment mirroring production will be available before test execution begins.
2. Test data (valid/invalid user accounts, SSO-enabled accounts) will be provisioned prior to testing.
3. Access to third-party SSO sandbox environments (Google, Microsoft) will be provided.
4. The PRD (Version 1.0) is the approved and baseline requirements document.
5. Development will follow the three-phase delivery model outlined in the PRD.

### 4.4 Constraints

1. Testing timelines are dependent on development delivery dates per phase.
2. Security and penetration testing require specialized tools and may need external vendor support.
3. Performance testing under geo-distributed conditions requires multi-region test infrastructure.
4. GDPR/CCPA compliance validation may require legal team consultation.

---

## 5. Test Strategy

### 5.1 Testing Types

| # | Testing Type            | Objective                                                                 | Tools / Approach            |
|---|-------------------------|---------------------------------------------------------------------------|-----------------------------|
| 1 | **Functional Testing**  | Validate all login, validation, password, and session features per PRD    | Manual + Automated (Selenium/Cypress) |
| 2 | **UI/UX Testing**       | Verify responsive design, themes, loading states, visual consistency      | Manual + Visual regression tools |
| 3 | **Security Testing**    | Validate encryption, rate limiting, session security, OWASP compliance    | OWASP ZAP, Burp Suite, manual |
| 4 | **Performance Testing** | Validate < 2s page load, concurrent users, CDN, high availability        | JMeter, Lighthouse, WebPageTest |
| 5 | **Accessibility Testing** | Validate WCAG 2.1 AA, screen reader, keyboard nav, high contrast       | Axe, WAVE, NVDA, manual    |
| 6 | **Integration Testing** | Validate SSO, social login, dashboard transition, analytics tracking      | Manual + API testing (Postman) |
| 7 | **Regression Testing**  | Ensure existing functionality is unaffected after changes                 | Automated suite             |
| 8 | **UAT Testing**         | End-user validation of login experience                                   | Manual — stakeholder-driven |

### 5.2 Testing Levels

| Level               | Description                                                  |
|----------------------|--------------------------------------------------------------|
| **Unit Testing**     | Performed by development team (out of QA scope)              |
| **Component Testing** | Individual feature testing (login form, password reset, etc.) |
| **Integration Testing** | Cross-component and third-party integration validation    |
| **System Testing**   | End-to-end validation of complete login flows                |
| **Acceptance Testing** | Stakeholder sign-off based on business requirements        |

### 5.3 Test Design Techniques

- Equivalence Partitioning (valid/invalid inputs)
- Boundary Value Analysis (field lengths, password complexity)
- Decision Table Testing (login conditions matrix)
- State Transition Testing (session states, account lockout)
- Error Guessing (common edge cases)
- Exploratory Testing (unscripted session-based testing)

---

## 6. Features to be Tested

Each feature is assigned a unique requirement ID (`REQ-xxx`) for traceability.

### 6.1 Authentication System

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-001 | Email and password-based login       | Functional Req — Login Process        | Critical |
| REQ-002 | Session management with configurable timeout | Functional Req — Login Process | Critical |
| REQ-003 | Multi-Factor Authentication (MFA)    | Functional Req — Login Process        | High     |
| REQ-004 | Single Sign-On (SSO) integration     | Functional Req — Login Process        | High     |

### 6.2 User Input Validation

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-005 | Real-time field validation on blur   | Functional Req — User Input Validation | High    |
| REQ-006 | Email format verification            | Functional Req — User Input Validation | High    |
| REQ-007 | Password strength indicator          | Functional Req — User Input Validation | Medium  |
| REQ-008 | Clear actionable error messages      | Functional Req — User Input Validation | High    |

### 6.3 Password Management

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-009 | Forgot password flow with token      | Functional Req — Password Management  | Critical |
| REQ-010 | Email-based password recovery        | Functional Req — Password Management  | Critical |
| REQ-011 | Password complexity enforcement      | Functional Req — Password Management  | High     |

### 6.4 User Experience — Interface Design

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-012 | Responsive/mobile-optimized design   | UX Features — Interface Design        | High     |
| REQ-013 | Auto-focus on first input field      | UX Features — Interface Design        | Medium   |
| REQ-014 | Clickable form labels                | UX Features — Interface Design        | Medium   |
| REQ-015 | Loading state indicators             | UX Features — Interface Design        | Medium   |

### 6.5 Accessibility

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-016 | Screen reader support (ARIA labels)  | UX Features — Accessibility           | High     |
| REQ-017 | High contrast mode                   | UX Features — Accessibility           | Medium   |
| REQ-018 | Full keyboard navigation             | UX Features — Accessibility           | High     |

### 6.6 Branding and Visual Design

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-019 | Brand consistency with VWO design system | UX Features — Branding             | Medium   |
| REQ-020 | Light and Dark mode theme support    | UX Features — Branding               | High     |

### 6.7 Security — Data Protection

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-021 | End-to-end encryption for auth data  | Technical Req — Data Protection       | Critical |
| REQ-022 | Encrypted password storage (hashing) | Technical Req — Data Protection       | Critical |
| REQ-023 | Secure session token management      | Technical Req — Data Protection       | Critical |
| REQ-024 | HTTPS enforcement (SSL/TLS)          | Technical Req — Data Protection       | Critical |

### 6.8 Security — Compliance

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-025 | GDPR compliance for user data        | Technical Req — Compliance            | Critical |
| REQ-026 | Enterprise security policy support   | Technical Req — Compliance            | High     |
| REQ-027 | Rate limiting (brute force protection) | Technical Req — Compliance          | Critical |

### 6.9 Performance — Load Time

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-028 | Page load within 2 seconds           | Technical Req — Load Time             | Critical |
| REQ-029 | Asset optimization (compressed/minified) | Technical Req — Load Time          | High     |
| REQ-030 | CDN integration for global performance | Technical Req — Load Time           | High     |

### 6.10 Performance — Scalability

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-031 | 99.9% uptime availability           | Technical Req — Scalability           | Critical |
| REQ-032 | Concurrent user support (thousands)  | Technical Req — Scalability           | High     |
| REQ-033 | Multi-region geographic distribution | Technical Req — Scalability           | High     |

### 6.11 Platform Integrations

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-034 | Seamless transition to VWO dashboard | Integration Req — Platform            | Critical |
| REQ-035 | Login analytics tracking             | Integration Req — Platform            | Medium   |
| REQ-036 | Customer support integration         | Integration Req — Platform            | Medium   |

### 6.12 Third-Party Integrations

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-037 | Enterprise SSO (SAML, OAuth)         | Integration Req — Third-Party         | High     |
| REQ-038 | Social login (Google, Microsoft)     | Integration Req — Third-Party         | High     |
| REQ-039 | Marketing/onboarding tool integration | Integration Req — Third-Party        | Medium   |

### 6.13 User Journeys

| REQ ID  | Feature                              | PRD Reference                         | Priority |
|---------|--------------------------------------|---------------------------------------|----------|
| REQ-040 | New user journey (discovery → signup → onboarding) | User Journey — New User    | High     |
| REQ-041 | Returning user journey (quick login → dashboard) | User Journey — Returning User | Critical |
| REQ-042 | Error recovery flow                  | User Journey — Error Recovery         | High     |

---

## 7. Features NOT to be Tested

| Exclusion ID | Feature                          | Justification                                     |
|--------------|----------------------------------|----------------------------------------------------|
| EXC-001      | Biometric authentication         | PRD classifies as "Future Enhancement"             |
| EXC-002      | Adaptive/risk-based authentication | PRD classifies as "Future Enhancement"           |
| EXC-003      | Progressive Web App (PWA)        | PRD classifies as "Future Enhancement"             |
| EXC-004      | A/B testing of login experience  | Optimization activity, not functional requirement  |
| EXC-005      | User behavior analytics engine   | PRD classifies as "Future Enhancement"             |
| EXC-006      | Personalization engine           | PRD classifies as "Future Enhancement"             |
| EXC-007      | VWO core post-login modules      | Separate test plan scope                           |
| EXC-008      | Backend infrastructure (servers, DB) | Covered by DevOps/Infra test plan              |

---

## 8. Requirements Traceability Matrix (RTM)

The RTM maps each requirement (`REQ-xxx`) to one or more test scenarios (`TS-xxx`), ensuring complete coverage.

### 8.1 Authentication System

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-001 | Email/password login                 | TS-001  | Verify successful login with valid email and password            | Functional      | Critical |
| REQ-001 | Email/password login                 | TS-002  | Verify login failure with invalid email                          | Functional      | Critical |
| REQ-001 | Email/password login                 | TS-003  | Verify login failure with invalid password                       | Functional      | Critical |
| REQ-001 | Email/password login                 | TS-004  | Verify login failure with empty email field                      | Functional      | High     |
| REQ-001 | Email/password login                 | TS-005  | Verify login failure with empty password field                   | Functional      | High     |
| REQ-001 | Email/password login                 | TS-006  | Verify login failure with both fields empty                      | Functional      | High     |
| REQ-001 | Email/password login                 | TS-007  | Verify login with SQL injection attempt in email field           | Security        | Critical |
| REQ-001 | Email/password login                 | TS-008  | Verify login with XSS attempt in input fields                   | Security        | Critical |
| REQ-002 | Session management                   | TS-009  | Verify session is created after successful login                 | Functional      | Critical |
| REQ-002 | Session management                   | TS-010  | Verify session timeout after configured idle period              | Functional      | High     |
| REQ-002 | Session management                   | TS-011  | Verify session invalidation on logout                            | Functional      | Critical |
| REQ-002 | Session management                   | TS-012  | Verify concurrent session handling (same user, multiple browsers) | Functional     | High     |
| REQ-003 | Multi-Factor Authentication          | TS-013  | Verify MFA prompt after valid email/password entry               | Functional      | High     |
| REQ-003 | Multi-Factor Authentication          | TS-014  | Verify successful login after valid MFA code entry               | Functional      | High     |
| REQ-003 | Multi-Factor Authentication          | TS-015  | Verify login blocked with invalid MFA code                       | Functional      | High     |
| REQ-003 | Multi-Factor Authentication          | TS-016  | Verify MFA code expiry behavior                                  | Functional      | Medium   |
| REQ-004 | Single Sign-On (SSO)                 | TS-017  | Verify SSO login redirects to identity provider                  | Integration     | High     |
| REQ-004 | Single Sign-On (SSO)                 | TS-018  | Verify successful login via SAML-based SSO                       | Integration     | High     |
| REQ-004 | Single Sign-On (SSO)                 | TS-019  | Verify successful login via OAuth-based SSO                      | Integration     | High     |
| REQ-004 | Single Sign-On (SSO)                 | TS-020  | Verify SSO failure with invalid/expired token                    | Integration     | High     |

### 8.2 User Input Validation

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-005 | Real-time validation on blur         | TS-021  | Verify validation triggers on email field blur                   | Functional      | High     |
| REQ-005 | Real-time validation on blur         | TS-022  | Verify validation triggers on password field blur                | Functional      | High     |
| REQ-006 | Email format verification            | TS-023  | Verify error for malformed email (missing @, domain)             | Functional      | High     |
| REQ-006 | Email format verification            | TS-024  | Verify acceptance of valid email formats                         | Functional      | High     |
| REQ-006 | Email format verification            | TS-025  | Verify specialized keyboard on mobile for email field            | UI/UX           | Medium   |
| REQ-007 | Password strength indicator          | TS-026  | Verify weak password strength indicator display                  | Functional      | Medium   |
| REQ-007 | Password strength indicator          | TS-027  | Verify strong password strength indicator display                | Functional      | Medium   |
| REQ-008 | Actionable error messages            | TS-028  | Verify error message for invalid credentials                     | Functional      | High     |
| REQ-008 | Actionable error messages            | TS-029  | Verify error message for locked account                          | Functional      | High     |
| REQ-008 | Actionable error messages            | TS-030  | Verify error messages do not expose sensitive information         | Security        | Critical |

### 8.3 Password Management

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-009 | Forgot password flow                 | TS-031  | Verify "Forgot Password" link navigates to reset page            | Functional      | Critical |
| REQ-009 | Forgot password flow                 | TS-032  | Verify password reset email is sent for valid email              | Functional      | Critical |
| REQ-009 | Forgot password flow                 | TS-033  | Verify secure token in reset link is unique and time-limited     | Security        | Critical |
| REQ-009 | Forgot password flow                 | TS-034  | Verify reset token cannot be reused after password change        | Security        | Critical |
| REQ-010 | Email-based recovery                 | TS-035  | Verify password recovery email delivery                          | Functional      | Critical |
| REQ-010 | Email-based recovery                 | TS-036  | Verify behavior when non-registered email is used for recovery   | Functional      | High     |
| REQ-011 | Password complexity                  | TS-037  | Verify password rejected if below minimum length                 | Functional      | High     |
| REQ-011 | Password complexity                  | TS-038  | Verify password rejected if missing required character types     | Functional      | High     |
| REQ-011 | Password complexity                  | TS-039  | Verify password accepted when all complexity rules are met       | Functional      | High     |

### 8.4 User Experience — Interface Design

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-012 | Responsive design                    | TS-040  | Verify login page layout on desktop (1920×1080)                  | UI/UX           | High     |
| REQ-012 | Responsive design                    | TS-041  | Verify login page layout on tablet (768×1024)                    | UI/UX           | High     |
| REQ-012 | Responsive design                    | TS-042  | Verify login page layout on mobile (375×667)                     | UI/UX           | High     |
| REQ-012 | Responsive design                    | TS-043  | Verify touch-friendly controls on mobile devices                 | UI/UX           | Medium   |
| REQ-013 | Auto-focus on first field            | TS-044  | Verify cursor auto-focuses on email field on page load           | UI/UX           | Medium   |
| REQ-014 | Clickable labels                     | TS-045  | Verify clicking label focuses corresponding input field          | UI/UX           | Medium   |
| REQ-015 | Loading states                       | TS-046  | Verify loading indicator displays during auth processing         | UI/UX           | Medium   |
| REQ-015 | Loading states                       | TS-047  | Verify submit button is disabled during loading state            | UI/UX           | Medium   |

### 8.5 Accessibility

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-016 | Screen reader support                | TS-048  | Verify ARIA labels on all form elements                          | Accessibility   | High     |
| REQ-016 | Screen reader support                | TS-049  | Verify screen reader reads error messages correctly              | Accessibility   | High     |
| REQ-017 | High contrast mode                   | TS-050  | Verify all elements are visible in high contrast mode            | Accessibility   | Medium   |
| REQ-017 | High contrast mode                   | TS-051  | Verify color contrast ratio meets WCAG 2.1 AA (4.5:1 minimum)   | Accessibility   | Medium   |
| REQ-018 | Keyboard navigation                  | TS-052  | Verify Tab key navigates through all interactive elements        | Accessibility   | High     |
| REQ-018 | Keyboard navigation                  | TS-053  | Verify Enter key submits login form                              | Accessibility   | High     |
| REQ-018 | Keyboard navigation                  | TS-054  | Verify visible focus indicators on all elements                  | Accessibility   | High     |

### 8.6 Branding and Visual Design

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-019 | Brand consistency                    | TS-055  | Verify VWO logo, colors, and typography match design system      | UI/UX           | Medium   |
| REQ-020 | Light/Dark mode                      | TS-056  | Verify login page renders correctly in Light mode                | UI/UX           | High     |
| REQ-020 | Light/Dark mode                      | TS-057  | Verify login page renders correctly in Dark mode                 | UI/UX           | High     |
| REQ-020 | Light/Dark mode                      | TS-058  | Verify theme toggle/switch functionality                         | Functional      | High     |
| REQ-020 | Light/Dark mode                      | TS-059  | Verify theme preference persistence across sessions              | Functional      | Medium   |

### 8.7 Security — Data Protection

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-021 | E2E encryption for auth data         | TS-060  | Verify credentials are encrypted in transit (network inspection) | Security        | Critical |
| REQ-022 | Encrypted password storage           | TS-061  | Verify passwords are hashed (not stored in plaintext) in DB      | Security        | Critical |
| REQ-023 | Secure session tokens                | TS-062  | Verify session tokens are random and non-predictable             | Security        | Critical |
| REQ-023 | Secure session tokens                | TS-063  | Verify session tokens are invalidated on logout                  | Security        | Critical |
| REQ-024 | HTTPS enforcement                    | TS-064  | Verify HTTP requests are redirected to HTTPS                     | Security        | Critical |
| REQ-024 | HTTPS enforcement                    | TS-065  | Verify valid SSL/TLS certificate is present                      | Security        | Critical |

### 8.8 Security — Compliance

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-025 | GDPR compliance                      | TS-066  | Verify privacy policy link is visible on login page              | Compliance      | Critical |
| REQ-025 | GDPR compliance                      | TS-067  | Verify cookie consent mechanism on first visit                   | Compliance      | Critical |
| REQ-025 | GDPR compliance                      | TS-068  | Verify no personal data is logged in browser console/network     | Compliance      | Critical |
| REQ-026 | Enterprise security policies         | TS-069  | Verify support for IP whitelisting for enterprise accounts       | Security        | High     |
| REQ-026 | Enterprise security policies         | TS-070  | Verify audit trail for login/logout events                       | Security        | High     |
| REQ-027 | Rate limiting                        | TS-071  | Verify account lockout after N consecutive failed attempts       | Security        | Critical |
| REQ-027 | Rate limiting                        | TS-072  | Verify CAPTCHA or challenge after threshold failed attempts      | Security        | Critical |
| REQ-027 | Rate limiting                        | TS-073  | Verify rate limiting on password reset endpoint                  | Security        | High     |

### 8.9 Performance

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-028 | Page load < 2 seconds                | TS-074  | Verify login page load time on standard 4G connection            | Performance     | Critical |
| REQ-028 | Page load < 2 seconds                | TS-075  | Verify login page load time on 3G/slow connection                | Performance     | High     |
| REQ-029 | Asset optimization                   | TS-076  | Verify images are compressed and CSS/JS are minified             | Performance     | High     |
| REQ-029 | Asset optimization                   | TS-077  | Verify no render-blocking resources                              | Performance     | Medium   |
| REQ-030 | CDN integration                      | TS-078  | Verify static assets are served via CDN                          | Performance     | High     |
| REQ-031 | 99.9% uptime                         | TS-079  | Verify login page availability monitoring is in place            | Performance     | Critical |
| REQ-032 | Concurrent users                     | TS-080  | Verify login page under 1,000 concurrent user load              | Performance     | High     |
| REQ-032 | Concurrent users                     | TS-081  | Verify login page under 5,000 concurrent user load              | Performance     | High     |
| REQ-033 | Multi-region distribution            | TS-082  | Verify page load from North America region                       | Performance     | High     |
| REQ-033 | Multi-region distribution            | TS-083  | Verify page load from Europe region                              | Performance     | High     |
| REQ-033 | Multi-region distribution            | TS-084  | Verify page load from Asia-Pacific region                        | Performance     | High     |

### 8.10 Integrations

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-034 | Transition to VWO dashboard          | TS-085  | Verify redirect to main dashboard after successful login         | Integration     | Critical |
| REQ-034 | Transition to VWO dashboard          | TS-086  | Verify user context (name, role, settings) loads on dashboard    | Integration     | High     |
| REQ-035 | Login analytics tracking             | TS-087  | Verify login success event is tracked in analytics               | Integration     | Medium   |
| REQ-035 | Login analytics tracking             | TS-088  | Verify login failure event is tracked in analytics               | Integration     | Medium   |
| REQ-036 | Customer support integration         | TS-089  | Verify support/help link is accessible from login page           | Integration     | Medium   |
| REQ-037 | Enterprise SSO (SAML/OAuth)          | TS-090  | Verify SAML assertion processing for enterprise login            | Integration     | High     |
| REQ-037 | Enterprise SSO (SAML/OAuth)          | TS-091  | Verify OAuth token exchange for enterprise login                 | Integration     | High     |
| REQ-038 | Social login (Google)                | TS-092  | Verify login via Google account                                  | Integration     | High     |
| REQ-038 | Social login (Microsoft)             | TS-093  | Verify login via Microsoft account                               | Integration     | High     |
| REQ-038 | Social login                         | TS-094  | Verify behavior when social login provider is unavailable        | Integration     | Medium   |
| REQ-039 | Marketing/onboarding tools           | TS-095  | Verify onboarding flow triggers for first-time login             | Integration     | Medium   |

### 8.11 User Journeys (End-to-End)

| REQ ID  | Requirement                          | TS ID   | Test Scenario                                                    | Test Type       | Priority |
|---------|--------------------------------------|---------|------------------------------------------------------------------|-----------------|----------|
| REQ-040 | New user journey                     | TS-096  | E2E: User lands on login → clicks signup → completes registration → onboards | E2E    | High     |
| REQ-040 | New user journey                     | TS-097  | Verify free trial CTA is visible and functional                  | Functional      | High     |
| REQ-041 | Returning user journey               | TS-098  | E2E: User with "Remember Me" → auto-fills → logs in → dashboard | E2E             | Critical |
| REQ-041 | Returning user journey               | TS-099  | Verify "Remember Me" checkbox persists credentials               | Functional      | High     |
| REQ-041 | Returning user journey               | TS-100  | Verify session restoration preserves previous activity context   | Functional      | Medium   |
| REQ-042 | Error recovery flow                  | TS-101  | E2E: Failed login → clear error → recover via password reset     | E2E             | High     |
| REQ-042 | Error recovery flow                  | TS-102  | Verify multiple recovery paths are available (reset, support)    | Functional      | High     |
| REQ-042 | Error recovery flow                  | TS-103  | Verify success confirmation after successful login recovery      | Functional      | Medium   |

---

## 9. Test Environment

### 9.1 Browser Matrix

| Browser           | Versions          | Priority |
|-------------------|--------------------|----------|
| Google Chrome     | Latest, Latest-1   | Critical |
| Mozilla Firefox   | Latest, Latest-1   | High     |
| Microsoft Edge    | Latest, Latest-1   | High     |
| Apple Safari      | Latest, Latest-1   | High     |
| Samsung Internet  | Latest              | Medium   |

### 9.2 Operating Systems

| OS              | Versions                    | Priority |
|-----------------|-----------------------------|----------|
| Windows         | 10, 11                      | Critical |
| macOS           | Ventura, Sonoma, Sequoia    | High     |
| iOS             | 16, 17, 18                  | High     |
| Android         | 13, 14, 15                  | High     |

### 9.3 Device Types

| Device Type     | Examples                          | Priority |
|-----------------|-----------------------------------|----------|
| Desktop         | 1920×1080, 1366×768, 2560×1440   | Critical |
| Tablet          | iPad (768×1024), Android Tab      | High     |
| Mobile          | iPhone (375×812), Android (360×800) | High   |

### 9.4 Network Conditions

| Condition          | Specification       | Purpose                      |
|--------------------|----------------------|------------------------------|
| High-speed (4G/5G) | ≥ 10 Mbps           | Baseline performance         |
| Standard 3G        | ~1.5 Mbps            | Slow network validation      |
| Offline/Flaky      | Intermittent         | Error handling validation    |

### 9.5 Test Tools

| Tool Category       | Tool(s)                                | Purpose                              |
|---------------------|----------------------------------------|--------------------------------------|
| Test Management     | Jira / Azure DevOps / TestRail         | Test case management, defect tracking |
| Functional Automation | Selenium WebDriver / Cypress         | Automated functional regression      |
| API Testing         | Postman / REST Assured                 | SSO, token, and integration testing  |
| Security Testing    | OWASP ZAP / Burp Suite                 | Vulnerability scanning               |
| Performance Testing | Apache JMeter / k6                     | Load and stress testing              |
| Accessibility       | Axe DevTools / WAVE / NVDA / VoiceOver | WCAG compliance validation           |
| Visual Regression   | Percy / BackstopJS                     | UI visual consistency                |
| Browser Testing     | BrowserStack / Sauce Labs              | Cross-browser/device testing         |
| Monitoring          | Lighthouse / WebPageTest               | Page performance auditing            |

### 9.6 Test Data Requirements

| Data Type                | Description                                  |
|--------------------------|----------------------------------------------|
| Valid user accounts       | Active accounts with known credentials      |
| Invalid credentials       | Incorrect email/password combinations       |
| MFA-enabled accounts      | Accounts with 2FA configured               |
| SSO-enabled accounts      | Enterprise accounts linked to IdP          |
| Social login accounts     | Google and Microsoft test accounts          |
| Locked/suspended accounts | Accounts in various states                 |
| New/unregistered emails   | For registration and recovery testing       |

---

## 10. Entry and Exit Criteria

### 10.1 Entry Criteria

| # | Criterion                                                                  |
|---|----------------------------------------------------------------------------|
| 1 | Development for the phase/sprint is complete and code is deployed to the test environment |
| 2 | Unit test pass rate ≥ 90% (provided by development team)                   |
| 3 | Test environment is provisioned, stable, and mirrors production config     |
| 4 | Test data is created and available                                         |
| 5 | Test plan and test cases are reviewed and approved                         |
| 6 | No critical/blocker defects from previous phase remain open                |
| 7 | Access credentials for all test tools and environments are available       |

### 10.2 Exit Criteria

| # | Criterion                                                                  |
|---|----------------------------------------------------------------------------|
| 1 | 100% of Critical priority test scenarios executed                          |
| 2 | 95% of High priority test scenarios executed                               |
| 3 | 90% of Medium priority test scenarios executed                             |
| 4 | 0 open Critical severity defects                                           |
| 5 | 0 open High severity defects (or approved deferral by PM)                  |
| 6 | All security test scenarios passed                                         |
| 7 | Performance KPIs met (page load < 2s, concurrent user targets)             |
| 8 | Accessibility audit passed (WCAG 2.1 AA compliance)                       |
| 9 | UAT sign-off obtained from Product Manager                                 |
| 10 | Test summary report generated and reviewed                                |

### 10.3 Suspension Criteria

| # | Criterion                                                                  |
|---|----------------------------------------------------------------------------|
| 1 | Test environment becomes unstable or unavailable                           |
| 2 | Critical blocker defect prevents further test execution                    |
| 3 | > 30% of test cases fail due to a single root cause                        |
| 4 | Major scope change or requirement modification                             |

### 10.4 Resumption Criteria

| # | Criterion                                                                  |
|---|----------------------------------------------------------------------------|
| 1 | Root cause of suspension is resolved and verified                          |
| 2 | Test environment is restored and validated                                 |
| 3 | Impacted test cases are re-baselined if necessary                          |

---

## 11. Test Schedule and Milestones

The schedule is aligned with the PRD's three development phases.

### 11.1 Phase 1 — Core Authentication

| Milestone                     | Duration   | Deliverable                    |
|-------------------------------|-----------|--------------------------------|
| Test Planning & Design        | Week 1-2  | Test plan, test cases          |
| Functional Testing            | Week 3-4  | REQ-001 to REQ-011 validated   |
| Security Testing (Core)       | Week 4-5  | REQ-021 to REQ-024, REQ-027    |
| Defect Fix & Retest           | Week 5-6  | Defect resolution              |
| Phase 1 Sign-off              | Week 6    | Test summary report            |

**Scope:** Login form, validation, password reset, core security (TS-001 to TS-039, TS-060 to TS-065, TS-071 to TS-073)

### 11.2 Phase 2 — Enhanced UX

| Milestone                     | Duration   | Deliverable                    |
|-------------------------------|-----------|--------------------------------|
| Test Case Update              | Week 7    | Updated test cases             |
| UI/UX Testing                 | Week 7-8  | REQ-012 to REQ-020 validated   |
| Accessibility Testing         | Week 8-9  | REQ-016 to REQ-018, WCAG audit |
| Performance Testing           | Week 9-10 | REQ-028 to REQ-033 validated   |
| Regression Testing            | Week 10   | Full regression cycle          |
| Phase 2 Sign-off              | Week 10   | Test summary report            |

**Scope:** Responsive design, themes, accessibility, performance (TS-040 to TS-059, TS-074 to TS-084)

### 11.3 Phase 3 — Enterprise Features

| Milestone                     | Duration   | Deliverable                    |
|-------------------------------|-----------|--------------------------------|
| Test Case Update              | Week 11   | Updated test cases             |
| Integration Testing           | Week 11-12 | REQ-034 to REQ-039 validated  |
| Enterprise SSO/Security       | Week 12-13 | REQ-004, REQ-025, REQ-026     |
| E2E User Journey Testing      | Week 13   | REQ-040 to REQ-042 validated   |
| Full Regression               | Week 14   | Complete regression cycle      |
| UAT                           | Week 14-15 | Stakeholder validation        |
| Final Sign-off                | Week 15   | Final test summary report      |

**Scope:** SSO, social login, integrations, compliance, E2E flows (TS-017 to TS-020, TS-066 to TS-070, TS-085 to TS-103)

---

## 12. Roles and Responsibilities

| Role                | Responsibilities                                                          | RACI    |
|---------------------|---------------------------------------------------------------------------|---------|
| **QA Lead**         | Test plan creation, test strategy, resource allocation, risk management, reporting | A, R |
| **QA Engineer (Functional)** | Test case design, manual testing, defect reporting                | R       |
| **QA Engineer (Automation)** | Test automation framework, regression suite, CI/CD integration   | R       |
| **Security Tester** | Security testing, vulnerability assessment, OWASP compliance validation   | R       |
| **Performance Tester** | Load/stress testing, performance benchmarking, CDN validation          | R       |
| **Accessibility Tester** | WCAG audit, screen reader testing, contrast validation               | R       |
| **Development Lead** | Bug fixes, unit testing, code reviews, technical support for QA          | C       |
| **Product Manager** | Requirements clarification, UAT, exit criteria sign-off                  | A       |
| **DevOps Lead**     | Test environment setup, CI/CD pipeline, monitoring                       | R, C    |
| **UX Designer**     | Design specification clarification, visual regression review             | C       |

> **RACI Key:** R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## 13. Risk Assessment and Mitigation

| RSK ID  | Risk Description                                      | Probability | Impact   | Mitigation Strategy                                              |
|---------|-------------------------------------------------------|-------------|----------|------------------------------------------------------------------|
| RSK-001 | Test environment instability or downtime              | Medium      | High     | Maintain backup env; automated health checks; escalation path    |
| RSK-002 | Delayed development delivery affecting test schedule  | Medium      | High     | Buffer weeks in schedule; parallel test case design during dev   |
| RSK-003 | Third-party SSO sandbox unavailability                | Medium      | Medium   | Mock SSO responses for initial testing; escalate early           |
| RSK-004 | Insufficient test data for edge cases                 | Low         | Medium   | Create comprehensive test data matrix upfront; automation scripts |
| RSK-005 | Security vulnerabilities discovered late in cycle     | Medium      | Critical | Shift-left security testing; integrate SAST/DAST in CI/CD       |
| RSK-006 | Accessibility issues requiring significant rework     | Medium      | High     | Early accessibility review in Phase 2; developer training        |
| RSK-007 | Performance degradation under high load               | Medium      | High     | Early load testing; CDN validation; auto-scaling verification    |
| RSK-008 | Cross-browser compatibility issues                    | Medium      | Medium   | Cloud-based device lab (BrowserStack); prioritize top browsers   |
| RSK-009 | Requirement changes mid-cycle                         | Low         | High     | Change control process; impact analysis before accepting changes |
| RSK-010 | Resource unavailability (specialized testers)         | Low         | Medium   | Cross-train team members; maintain resource backup plan          |

---

## 14. Defect Management

### 14.1 Severity Classification

| Severity    | Definition                                                                | Example                                      |
|-------------|---------------------------------------------------------------------------|----------------------------------------------|
| **S1 — Critical** | System crash, data loss, security breach; no workaround               | Login completely non-functional; password leak |
| **S2 — High**    | Major feature broken; workaround exists but impacts usability          | SSO login fails; password reset not sending email |
| **S3 — Medium**  | Minor feature issue; workaround available; no data loss                | Password strength indicator not updating      |
| **S4 — Low**     | Cosmetic issue; minor visual or text defect                            | Typo in error message; color mismatch         |

### 14.2 Priority Classification

| Priority    | Definition                                        | Resolution SLA     |
|-------------|---------------------------------------------------|--------------------|
| **P1 — Urgent** | Must be fixed immediately; blocks testing      | Within 24 hours    |
| **P2 — High**   | Must be fixed in current sprint/iteration      | Within 3 days      |
| **P3 — Medium** | Should be fixed before release                 | Within 1 week      |
| **P4 — Low**    | Can be deferred to next release                | Next release cycle |

### 14.3 Defect Lifecycle

```
New → Assigned → In Progress → Fixed → Ready for Retest → Retest → Closed
                                   ↓                         ↓
                               Rejected                  Reopened → In Progress
```

### 14.4 Defect Report Template

Each defect report shall include:

| Field              | Description                                    |
|--------------------|------------------------------------------------|
| Defect ID          | Auto-generated unique identifier               |
| Title              | Clear, concise defect summary                  |
| Severity           | S1 / S2 / S3 / S4                              |
| Priority           | P1 / P2 / P3 / P4                              |
| Module             | Authentication / Validation / UX / Security / Performance |
| Environment        | Browser, OS, device, build version             |
| Steps to Reproduce | Numbered step-by-step reproduction             |
| Expected Result    | What should happen per PRD requirements        |
| Actual Result      | What actually happened                         |
| Attachments        | Screenshots, logs, video recordings            |
| Linked REQ/TS      | Mapped REQ-xxx and TS-xxx references           |
| Assigned To        | Developer name                                 |
| Reported By        | QA engineer name                               |
| Date Reported      | YYYY-MM-DD                                     |

---

## 15. Test Deliverables

| DEL ID  | Deliverable                        | Phase       | Owner     |
|---------|------------------------------------|-------------|-----------|
| DEL-001 | Test Plan Document (this document) | Planning    | QA Lead   |
| DEL-002 | Test Cases / Test Scripts          | Each Phase  | QA Team   |
| DEL-003 | Requirements Traceability Matrix   | Each Phase  | QA Lead   |
| DEL-004 | Test Environment Setup Report      | Pre-Phase 1 | DevOps    |
| DEL-005 | Test Data Preparation Document     | Pre-Phase 1 | QA Team   |
| DEL-006 | Daily Test Execution Reports       | Each Phase  | QA Team   |
| DEL-007 | Defect Reports                     | Each Phase  | QA Team   |
| DEL-008 | Defect Summary / Metrics Report    | Phase End   | QA Lead   |
| DEL-009 | Security Test Report               | Phase 1, 3  | Security  |
| DEL-010 | Performance Test Report            | Phase 2     | Perf Team |
| DEL-011 | Accessibility Audit Report         | Phase 2     | A11y Team |
| DEL-012 | Regression Test Report             | Phase 2, 3  | QA Team   |
| DEL-013 | UAT Sign-off Report               | Phase 3     | PM        |
| DEL-014 | Final Test Summary Report          | Phase 3     | QA Lead   |

---

## 16. Approvals

| Approver             | Role             | Signature | Date       |
|----------------------|------------------|-----------|------------|
|                      | QA Lead          |           |            |
|                      | Development Lead |           |            |
|                      | Product Manager  |           |            |
|                      | Security Lead    |           |            |
|                      | DevOps Lead      |           |            |

---

**— End of Test Plan —**

**Document ID:** TP-VWO-LOGIN-2026-001  
**Version:** 1.0  
**Classification:** Internal — Confidential
