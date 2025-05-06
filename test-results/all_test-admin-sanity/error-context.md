# Test info

- Name: admin sanity
- Location: C:\Users\akhil\OneDrive\Desktop\test-worksana-js\test\all_test.spec.js:3:1

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://admin-staging.worksana.com/accounts/login", waiting until "load"

    at C:\Users\akhil\OneDrive\Desktop\test-worksana-js\test\all_test.spec.js:7:16
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test('admin sanity', async ({ page }) =>{
   4 |     const username = "amrit.shah+9898@thoughts2binary.com";
   5 |     const password = "Test@121";
   6 |         // Go to the login page
>  7 |     await page.goto('https://admin-staging.worksana.com/accounts/login');
     |                ^ Error: page.goto: Target page, context or browser has been closed
   8 |     await page.getByPlaceholder('Email Address/Username').fill(username);
   9 |     await page.getByPlaceholder('Password').fill(password);
  10 |     await page.getByRole('button', { name: 'Sign in' }).click();
  11 |     await page.waitForURL('https://admin-staging.worksana.com/dashboard');
  12 |     // applicant
  13 |     await page.getByRole('link', { name: 'Applicants' }).click();
  14 |     await page.locator('#create_applicant').click();
  15 |     await page.getByRole('textbox', { name: 'First name' }).fill('Test');
  16 |     await page.getByRole('textbox', { name: 'Last name (optional)' }).fill('User');
  17 |     await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Test@121');
  18 |     await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Test@121');
  19 |     await page.locator('div').filter({ hasText: /^Oganizational Information \(optional\)$/ }).getByRole('button').click();
  20 |     await page.getByRole('textbox', { name: 'First name' }).fill('Test');
  21 |     await page.getByRole('textbox', { name: 'Last name (optional)' }).fill('User');
  22 |     await page.getByRole('textbox', { name: 'Applicant ID' }).fill('Test1234'+timestamp);
  23 |     await page
  24 |
  25 |
  26 | });
```