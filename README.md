# TransportMe - E2E Testing Framework [Playwright + TypeScript]

A modular E2E testing framework built with Playwright and TypeScript for the TransportMe platform.

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Framework Structure](#framework-structure)
- [Test Suites](#test-suites)
- [Running Tests](#running-tests)
- [Reporting](#reporting)

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm
- [Allure CLI](https://allurereport.org/docs/install/) (for Allure reports)
- A TOTP authenticator app or the `MFA_SECRET` from the test account

### 1. Clone the repository

```bash
git clone <repository-url>
cd tme_auto_new
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
# Environment: test | staging | production
ENV=staging

# Login credentials
USERNAME=your_email@example.com
PASSWORD=your_password

# MFA secret (TOTP base32 secret from the test account's 2FA setup)
MFA_SECRET=YOUR_MFA_SECRET_HERE

# Browser mode
HEADLESS=false

# Basic Auth (set to true only if the environment requires it)
BASIC_AUTH_ENABLED=false
BASIC_AUTH_USER=
BASIC_AUTH_PASS=
```

> **Getting the MFA_SECRET**: When setting up 2FA on the test account, the setup page shows a QR code and a plain-text secret key. Copy that secret key and use it as `MFA_SECRET`. The framework uses `otplib` to generate TOTP codes automatically at runtime.

### 5. Verify setup

```bash
npm run test:ui
```

The Playwright UI should open and tests should be discoverable.

---

## Framework Structure

```
tme_auto_new/
├── configurations/               # Environment and auth configs
│   ├── auth.config.ts            # Reads USERNAME, PASSWORD, MFA_SECRET from .env
│   ├── env.config.ts             # Base URLs per environment (test/staging/production)
│   └── validation.config.ts      # Validates required env vars on startup
├── fixtures/                     # Playwright fixtures
│   └── auth.fixture.ts           # loginTest & mfaTest — handles login + MFA automatically
├── pages/                        # Page Object Model
│   ├── base.page.ts              # Base class with shared helpers
│   ├── login.page.ts             # Login page actions
│   └── mfa.page.ts               # MFA code entry
├── selectors/                    # Element selectors (centralized)
│   ├── login.selector.ts
│   └── mfa.selector.ts
├── tests/                        # Test specs
│   └── 00.login.spec.ts          # Login flow tests
├── common/
│   └── allureReport.ts           # Allure reporting helpers
├── helpers/
│   └── time.helper.ts            # Time utilities
├── playwright.config.ts          # Playwright configuration
├── package.json
└── tsconfig.json
```

---

## Test Suites

### Test Case Summary

| Test ID | Title | Tags |
|---------|-------|------|
| login_01 | Login successfully with valid credentials | `@login_01`, `@login` |

---

### Login Tests

**File**: [tests/00.login.spec.ts](tests/00.login.spec.ts)

#### [@login_01] Login successfully with valid credentials

**Tags**: `@login_01`, `@login`

**Test Steps**:
1. Open home page
2. Enter username and password
3. Enter MFA code (auto-generated from `MFA_SECRET`)
4. Verify URL does not contain `/login`
5. Verify dashboard is visible after login

**Expected Results**:
- User is redirected away from the login page
- Dashboard loads successfully

---

## Running Tests

### Basic Commands

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests (clears previous Allure results) |
| `npm run test:ui` | Interactive Playwright UI mode |
| `npm run test:headed` | Run with browser visible |
| `npm run test:debug` | Debug mode (step through tests) |

### Run by Tag

```bash
# All login tests
npm run test -- --grep '@(login)'

# Specific test by ID
npm run test -- --grep '@(login_01)'
```

### Run by Environment

```bash
# Staging (default)
npm run test

# Test environment
ENV=test npm run test

# Production
ENV=production npm run test
```

### Combined Examples

```bash
# Staging + headed + login tests
ENV=staging HEADLESS=false npm run test -- --grep '@(login)'

# Debug a specific test
ENV=staging npm run test:debug -- --grep '@(login_01)'
```

---

## Reporting

### Report Types

| Report | Location | Description |
|--------|----------|-------------|
| Playwright HTML | `playwright-report/index.html` | Summary, screenshots, videos, traces |
| Allure | `allure-report/index.html` | Rich dashboard with step-by-step details |

### Generate Reports

```bash
# Run tests with Playwright HTML report
npm run test:html

# Generate and open Allure report
npm run report:local

# Clean previous report data
npm run report:clean
```

### Full Test Cycle with Allure

```bash
# Step 1: Clean old results
npm run report:clean

# Step 2: Run tests
ENV=staging npm run test

# Step 3: Generate and open Allure report
npm run report:local
```

### Report Locations

```
tme_auto_new/
├── playwright-report/    # Playwright HTML report
├── allure-results/       # Raw Allure result files (JSON)
├── allure-report/        # Generated Allure HTML report
└── test-results/         # Screenshots, videos, traces
```

---

**Last Updated**: May 2026
