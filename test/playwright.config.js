const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
    timeout: 2400000, // Global test timeout
    reporter: [['html', { outputFolder: 'playwright-report' }]], // Enables HTML reporting
    use: {
        video : 'on',
        headless: false, // Runs in non-headless mode
        screenshot: 'only-on-failure', // Captures screenshots for failed tests
        trace: 'on', // Generates trace files for failed tests
        actionTimeout: 60000, // Timeout for each action
    },
    workers: 1, // number of test runs at a time
});