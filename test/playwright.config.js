const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
    timeout: 60000000, // Global test timeout
    reporter: [['html', { outputFolder: 'playwright-report' }]], // Enables HTML reporting
    use: {
        video : 'on',
        headless: false, // Runs in non-headless mode
        screenshot: 'only-on-failure', // Captures screenshots for failed tests
        trace: 'on', // Generates trace files for failed tests
        
    },
    workers: 4, // number of test runs at a time
});