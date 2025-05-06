const { test, expect } = require('@playwright/test');
test('admin sanity', async ({ page }) =>{
    const username = "amrit.shah+9898@thoughts2binary.com";
    const password = "Test@121";
    try {
        // Go to the login page
        await page.goto('https://admin-staging.worksana.com/accounts/login');
        await page.getByPlaceholder('Email Address/Username').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.waitForURL('https://admin-staging.worksana.com/dashboard');


        
    }catch (error) {
        console.error('Error in test:', error.message);
    }
    });