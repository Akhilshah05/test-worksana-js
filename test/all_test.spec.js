const { test, expect } = require('@playwright/test');

test('admin sanity', async ({ page }) =>{
    const username = "amrit.shah+9898@thoughts2binary.com";
    const password = "Test@121";
        // Go to the login page
    await page.goto('https://admin-staging.worksana.com/accounts/login');
    await page.getByPlaceholder('Email Address/Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('https://admin-staging.worksana.com/dashboard');
    // applicant
    await page.getByRole('link', { name: 'Applicants' }).click();
    await page.locator('#create_applicant').click();
    await page.getByRole('textbox', { name: 'First name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Last name (optional)' }).fill('User');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Test@121');
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Test@121');
    await page.locator('div').filter({ hasText: /^Oganizational Information \(optional\)$/ }).getByRole('button').click();
    await page.getByRole('textbox', { name: 'First name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Last name (optional)' }).fill('User');
    await page.getByRole('textbox', { name: 'Applicant ID' }).fill('Test1234'+timestamp);
    await page


});