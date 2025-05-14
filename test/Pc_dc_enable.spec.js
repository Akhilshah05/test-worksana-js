const { test, expect } = require('@playwright/test');
async function kisok_search_login(page) {
    try {
        await page.waitForTimeout(5000);
        await page.getByRole('textbox', { name: 'Enter employee name' }).fill('No Job');
        await page.getByRole('button', { name: 'Search' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.locator('//*[@type="password"][1]').fill('1');
        await page.getByRole('textbox').nth(1).fill('1');
        await page.getByRole('textbox').nth(2).fill('1');
        await page.getByRole('textbox').nth(3).fill('1');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForTimeout(7000);
    } catch (error) {
        console.error(error.message);
        await catchsteps(page);
    }
}
async function feedback(page) {
    try {
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('button', { name: 'Close Modal' }).click();
    } catch (error) {
        console.error(error.message);
        await catchsteps(page);
    }
}    
async function meal_session(page) {
    try {
        await page.getByRole('button', { name: 'Meal Break' }).click();
        await page.getByRole('button', { name: 'End Meal Break' }).click();
    } catch (error) {
        console.error(error.message);
    }
}
async function ss(page, stepName) {
    try {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Format the timestamp
        const fileName = `screenshots/${timestamp}_${stepName}.png`; // Add a unique identifier
        await page.screenshot({ path: fileName, fullPage: true });
    } catch (error) {   
        console.error('Error taking screenshot:', error.message);
        await catchsteps(page);
    }   
}
async function punchin(page) {
    try {
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('button', { name: 'Close Modal' }).click();
        await page.getByRole('button', { name: 'Punch In' }).click();
    } catch (error) {
        console.error(error.message);
        await catchsteps(page);
    }
}
async function system_setting(page) {
    try {
        const username = "amrit.shah+9898@thoughts2binary.com";
        const password = "Test@121";
        await page.goto('https://admin-staging.worksana.com/accounts/login');
        await page.getByPlaceholder('Email Address/Username').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.waitForURL('https://admin-staging.worksana.com/dashboard');
        await page.getByTitle('Upload Company Logo').click();
        await page.getByRole('menuitem', { name: 'System Settings' }).click();
        await page.waitForURL('https://admin-staging.worksana.com/vendor/basic-setting');
        await page.getByRole('link', { name: 'System', exact: true }).click();
        await page.getByRole('button', { name: '10/Page'}).click();
        await page.getByRole('menuitem', { name: '100/Page' }).click();
        await page.locator("(//*[normalize-space()='POST CORRECTION DAILY ATTESTATION']//preceding::*[@id='Artboard_1'])[last()]").click();
        await page.locator('.react-select__input-container').click();
        await page.getByRole('option', { name: 'ON' }).click();
        // enable Post correction daily attestation
        await page.getByRole('button', { name: 'Submit' }).click();
        console.log("enabled Post correction");
        // enable Daily compliance
        await page.getByRole('row', { name: 'Edit Setting ENABLE DAILY' }).getByRole('img').click();
        console.log("enable Daily compliance");
        await page.locator('.react-select__input-container').click();
        await page.getByRole('option', { name: 'Enable' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();
        await ss(page, 'System settings');
        await page.getByRole('link', { name: 'Company logo amrit.shah+9898@' }).click();
        // await page.getByRole('menuitem', { name: 'Logout' }).click();
    } catch (error) {
        console.error('Error in system_setting:', error.message);
        await catchsteps(page);
    }
}
async function login_kiosk_admin(page) {
    try {
        const kioskusername = "1195-nojob";
        const kiokspassword = "Test@121";
        await page.goto('https://kiosk-staging.worksana.com/accounts/login')
        await page.getByRole('textbox', { name: 'Username' }).fill(kioskusername);
        await page.getByRole('textbox', { name: 'Password' }).fill(kiokspassword);
        await page.getByRole('button', { name: 'Sign in' }).click();
    } catch (error) {
        console.error('Error in login_kiosk_admin:', error.message);
        await catchsteps(page);
    }
}
async function catchsteps(page) {
    await page.getByRole('button', { name: 'Submit Correction' }).click();
    await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
    await ss(page, 'missing meal');
    await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
}
test('Post correction and daily compliance enabled', async ({ page }) =>{
    
    // Go to the login page
    try {
        await system_setting(page);
        await login_kiosk_admin(page);
        // status = approved
        console.log("Approved started completed");
        await kisok_search_login(page);
        await punchin(page);
        await page.getByRole('button', { name: 'Punchout' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Approve' }).click();
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.waitForTimeout(2000);
        await ss(page, 'approved');
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.waitForTimeout(2000);
        await page.getByText('Logout').click();
        console.log("Status approved completed");
        // status submit correction
        console.log("Submit correction started completed");
        await kisok_search_login(page);
        await punchin(page);
        await page.getByRole('button', { name: 'Punchout' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('textbox', { name: 'Please leave a comment.*' }).fill('Test');
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await page.waitForTimeout(2000);
        await ss(page, 'Sumbit correction');
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.waitForTimeout(2000);
        await page.getByText('Logout').click();
        console.log("Sumbit correction completed");
        // status = dealyed meal
        console.log("delayed meal started");
        await kisok_search_login(page);
        await feedback(page);
        await page.getByRole('button', { name: 'Punch In' }).click();
        await page.waitForTimeout(240000); // wait for 4 minutes till punchout
        await kisok_search_login(page);
        await meal_session(page);
        await page.getByRole('button', { name: 'Punchout' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await ss(page, 'Delayed meal');
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.getByText('Logout').click();
        console.log("Delayed meal completed");
        // ststus = missing meal
        console.log("Missing meal started");
        await kisok_search_login(page);
        await punchin(page);
        await page.waitForTimeout(240000);
        await kisok_search_login(page);
        await page.getByRole('button', { name: 'Punchout' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await ss(page, 'missing meal');
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.getByText('Logout').click();
        console.log("Missing meal completed");

        // status = Force punchout
        console.log("Force punchout started");
        await kisok_search_login(page);
        await punchin(page);
        await meal_session(page);
        await page.waitForTimeout(480000);// wait for 8 minutes  till punchout
        await kisok_search_login(page);
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await ss(page, 'force punchout');
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.getByText('Logout').click();
        console.log("Force punchout completed");
        
        // status = missing meal force punchout
        console.log("missing meal Force punchout started");
        await kisok_search_login(page);
        await punchin(page);
        await page.waitForTimeout(480000);// wait for 8 minutes  till punchout
        await kisok_search_login(page);
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await ss(page, 'Missing punchin force punchout');
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.getByText('Logout').click();
        console.log("missing meal Force punchout completed");   
        // status = delayed meal force punchout
        console.log("delayed meal Force punchout started");
        await kisok_search_login(page);
        await punchin(page);
        await page.waitForTimeout(240000);// wait for 4 minutes  till punchout
        await kisok_search_login(page);
        await meal_session(page);
        await page.waitForTimeout(240000);// wait for 4 minutes  till punchout
        await kisok_search_login(page);
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await ss(page, 'Delayed meal force punchout');
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.getByText('Logout').click();
        console.log("delayed meal Force punchout complted");
    }catch (error) {
        console.error('Error in test:', error.message);
        await catchsteps(page);
    }
    });