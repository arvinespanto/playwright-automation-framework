# Playwright Automation Framework

End-to-end QA automation framework built with **Playwright** and **TypeScript**, using the **Page Object Model (POM)**, cross-browser testing, Jenkins CI, and GitHub integration.

## Overview

This project demonstrates a maintainable Playwright automation framework designed around real QA automation practices.

The current test target is the Playwright TodoMVC demo application:

`https://demo.playwright.dev/todomvc/`

The framework focuses on reusable page objects, test isolation, structured test scenarios, cross-browser execution, CI integration, and failure diagnostics.

## Tech Stack

* Playwright
* TypeScript
* Node.js
* Page Object Model
* Git / GitHub
* Jenkins
* HTML Test Reports
* Cross-browser testing

## Project Structure

```text
playwright-automation-framework/
├── pages/
│   ├── BasePage.ts
│   └── TodoPage.ts
│
├── tests/
│   ├── smoke.spec.ts
│   ├── todo-management.spec.ts
│   ├── filtering.spec.ts
│   ├── bulk-actions.spec.ts
│   └── state.spec.ts
│
├── test-data/
│   └── todos.ts
│
├── playwright.config.ts
├── Jenkinsfile
├── package.json
├── package-lock.json
├── .env.example
└── .gitignore
```

## Test Coverage

### Smoke Tests

* Application loads successfully
* Todo input is visible and editable

### Todo Management

* Create a todo
* Create multiple todos
* Edit a todo
* Delete a todo
* Complete a todo

### Filtering

* Display active todos
* Display completed todos
* Display all todos

### Bulk Actions

* Mark all todos as completed
* Clear completed todos

### State Validation

* Validate remaining todo count
* Verify todo state persists after page reload

## Page Object Model

The framework separates test logic from page interaction logic.

`BasePage.ts` contains shared page functionality, while `TodoPage.ts` contains TodoMVC-specific locators and reusable actions.

Example:

```ts
await todoPage.addTodo('Learn Playwright');

await expect(
  todoPage.getTodo('Learn Playwright')
).toBeVisible();
```

This keeps the test scenarios readable while reducing duplicated locator and interaction code.

## Cross-Browser Testing

The suite runs against:

* Chromium
* Firefox
* WebKit

Browser projects are configured in `playwright.config.ts`.

Run the complete test suite with:

```bash
npx playwright test
```

Run a specific browser:

```bash
npx playwright test --project=chromium
```

```bash
npx playwright test --project=firefox
```

```bash
npx playwright test --project=webkit
```

## Running Tests Locally

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Create a local environment file:

```text
.env.prod
```

Example:

```env
BASE_URL=https://demo.playwright.dev/todomvc/
```

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/todo-management.spec.ts
```

## Test Reporting

Playwright HTML reports are generated after test execution.

Open the report locally with:

```bash
npx playwright show-report
```

The framework is also configured to retain useful debugging artifacts such as:

* Playwright traces
* Screenshots on failure
* Videos on failure
* Test result artifacts

These artifacts help identify whether failures are caused by test logic, browser behavior, application state, or environment issues.

## Jenkins CI

The repository includes a `Jenkinsfile` for Pipeline-as-Code.

The Jenkins pipeline performs the following steps:

```text
GitHub Repository
        ↓
Jenkins Checkout
        ↓
npm ci
        ↓
Install Playwright Browsers
        ↓
Run Playwright Tests
        ↓
Chromium / Firefox / WebKit
        ↓
Publish Test Results
```

Core pipeline stages include:

* Checkout source code
* Install Node dependencies
* Install Playwright browsers
* Run the complete regression suite
* Archive Playwright test artifacts
* Publish the HTML test report

## Environment Configuration

Local environment configuration is stored outside source control.

Example:

```env
BASE_URL=https://demo.playwright.dev/todomvc/
```

The real `.env` files are excluded through `.gitignore`.

For CI environments, variables such as `BASE_URL` are supplied by Jenkins rather than committed to GitHub.

Sensitive values such as passwords, API keys, or tokens should be stored using Jenkins Credentials.

## CI Workflow

The intended workflow is:

```text
Feature Branch
      ↓
Pull Request
      ↓
Merge to main
      ↓
GitHub Webhook
      ↓
Jenkins Pipeline
      ↓
Playwright Regression Suite
      ↓
PASS / FAIL
```

This provides automated regression feedback whenever changes are integrated into the main branch.

## Testing Approach

The framework follows several Playwright and QA automation practices:

* Tests are independent and isolated
* Page Object Model is used for reusable UI interactions
* Assertions validate logical user scenarios rather than individual DOM elements
* Playwright auto-waiting is preferred over hard-coded delays
* Explicit waits are used only when there is a meaningful application state to wait for
* Cross-browser execution validates behavior across multiple browser engines
* Test data is separated from test implementation
* Environment-specific configuration is kept outside source control
* CI runs the complete regression suite automatically

## Key Learning Outcomes

This project demonstrates practical experience with:

* Playwright automation
* TypeScript
* Object-oriented test architecture
* Page Object Model
* Locator strategy
* Assertions and synchronization
* Test isolation
* Cross-browser testing
* Test data management
* Environment configuration
* Git branching and pull requests
* Jenkins CI
* Pipeline-as-Code
* GitHub integration
* Test reporting and debugging

## Planned Enhancements

This automation framework will continue to evolve alongside my upcoming AI-powered portfolio project.

Planned enhancements include:

* **Migrate test coverage to my new personal portfolio application**

  * Use the portfolio as a real application-under-test instead of relying only on a demo application
  * Cover new features as they are developed and released

* **AI-powered portfolio testing**

  * Automate the **“Ask My AI”** feature where visitors can ask questions about my experience, skills, and projects
  * Validate the UI and API integration of LLM-powered features
  * Add test coverage for RAG-based responses and source retrieval
  * Test loading states, error handling, invalid prompts, and API failures

* **Interactive AI feature / game testing**

  * Add automated coverage for AI-powered interactive experiences and games
  * Validate user flows, session state, input handling, and expected UI behavior

* **Smoke and regression test tagging**

  * Introduce `@smoke` and `@regression` test groups as the test suite grows
  * Run fast critical-path tests separately from the complete regression suite when appropriate

* **Expanded negative and edge-case testing**

  * Invalid inputs
  * Network/API failures
  * Empty states
  * Error handling
  * Boundary scenarios

* **API testing with Playwright**

  * Test backend endpoints independently from the UI
  * Validate status codes, response schemas, authentication, and error responses
  * Add API-level testing for the AI/RAG backend

* **LLM and RAG quality validation**

  * Separate deterministic Playwright UI testing from non-deterministic LLM response evaluation
  * Validate retrieval relevance, grounded responses, and source attribution
  * Explore automated evaluation strategies for AI-generated responses

* **CI integration for portfolio releases**

  * Trigger Jenkins automatically when changes are merged into the portfolio repository
  * Run Playwright cross-browser regression tests after application changes
  * Prevent releases from progressing when critical tests fail

* **Jenkins credential management**

  * Store API keys, LLM credentials, deployment tokens, and other secrets securely using Jenkins Credentials
  * Keep sensitive configuration outside source control

* **Staging and deployment quality gates**

  * Build and deploy portfolio changes to a staging environment
  * Run Playwright regression tests against the deployed application
  * Allow production deployment only after required quality checks pass
  * Support manual approval gates where appropriate

* **Parallel test execution strategy**

  * Introduce controlled parallel execution as the regression suite grows
  * Maintain test isolation and avoid shared test-data conflicts

* **Docker-based CI execution**

  * Containerize the Playwright test environment
  * Provide consistent browser and dependency versions across local and CI environments
  * Reduce machine-specific configuration differences

The long-term goal is to use this framework as part of an end-to-end engineering workflow:

## Author

**Arvin Espanto**

QA Automation / Web Development professional building practical automation projects using Playwright, TypeScript, CI/CD, and modern testing practices.
