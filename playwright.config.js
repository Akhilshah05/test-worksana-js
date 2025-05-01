const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
    timeout: 6000000, // Global test timeout
    reporter: [['html', { outputFolder: 'playwright-report' }]], // Enables HTML reporting
    use: {
        headless: false, // Runs in non-headless mode
        screenshot: 'only-on-failure', // Captures screenshots for failed tests
        trace: 'on-first-retry', // Generates trace files for failed tests
    },
    workers: 1, // Ensures only one test runs at a time
});