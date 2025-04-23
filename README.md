
# API Automation using Cypress

This project provides automated API testing scripts designed for the [ReqResponse.in](https://reqresponse.in) platform using Cypress. It includes validation logic, structured test scripts, and integrated test reporting with `mochawesome`.

## 🚀 Features

- Cypress-powered API automation
- Modular Page Object structure
- Easy-to-use fixtures and commands
- Beautiful reports using Mochawesome

---

## 📁 Project Structure

```
ApiAutomation-main/
│
├── cypress/
│   ├── e2e/
│   │   └── Prachi_postmanAPI.cy.js     # Main API test script
│   ├── fixtures/
│   │   └── example.json                # Test data
│   ├── pageobjects/
│   │   └── Reqres.js                   # Page object for API endpoints
│   └── support/
│       ├── commands.js                 # Custom commands
│       └── e2e.js                      # Test bootstrap
│
├── cypress.config.js                  # Cypress configuration file
├── package.json                       # NPM scripts and dependencies
└── README.md                          # Project documentation
```

---

## 🧰 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher recommended)
- npm (comes with Node.js)
- Git (optional, for cloning the repository)

---

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ApiAutomation-main.git
cd ApiAutomation-main
```

2. Install project dependencies:

```bash
npm install
```

---

## ✅ Running Tests

To execute Cypress tests:

```bash
npx cypress run
```

Or open the interactive Cypress Test Runner:

```bash
npx cypress open
```

---

## 🧾 Generating Reports (Mochawesome)

### Step 1: Install Reporting Tools

```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

### Step 2: Configure `cypress.config.js`

```js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true
  }
});
```

### Step 3: Update `package.json` Scripts

```json
"scripts": {
  "test:api": "cypress run",
  "report:merge": "mochawesome-merge cypress/reports/*.json > cypress/reports/report.json",
  "report:generate": "marge cypress/reports/report.json -f report -o cypress/reports"
}
```

### Step 4: Run Tests and Generate HTML Report

```bash
npm run test:api
npm run report:merge
npm run report:generate
```

Final HTML report will be available in `cypress/reports/report.html`.

---

## 🤝 Contribution

Contributions are welcome! Please fork the repo and submit a pull request.

---

## 📝 License

This project is licensed under the MIT License.

---

Thanks for checking it out! 😊

✨ Happy Testing! ✨
