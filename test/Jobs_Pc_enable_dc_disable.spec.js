const { test, expect } = require('@playwright/test');
async function kisok_search_login(page) {
    try {
        await page.waitForTimeout(5000);
        await page.getByRole('textbox', { name: 'Enter employee name' }).fill('With Job');
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
        await errorsteps(page);
    }
}
async function feedback(page) {
    try {
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('button', { name: 'Close Modal' }).click();
    } catch (error) {
        console.error(error.message);
        await errorsteps(page);
    }
}    
async function meal_session(page) {
    try {
        await page.getByRole('button', { name: 'Meal Break' }).click();
        await page.getByRole('button', { name: 'End Meal Break' }).click();
        await page.getByRole('button', { name: 'Resume' }).click();
        await page.waitforselector('button', { name: 'Punchout' });
    } catch (error) {
        console.error(error.message);
        await errorsteps(page);
    }
}
async function ss(page, stepName) {
    try {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Format the timestamp
        const fileName = `screenshots/${timestamp}_${stepName}.png`; // Add a unique identifier
        await page.screenshot({ path: fileName, fullPage: true });
    } catch (error) {   
        console.error('Error taking screenshot:', error.message);
        await errorsteps(page);
    }   
}
async function punchin(page) {
    try {
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await page.getByRole('button', { name: 'Close Modal' }).click();
        await page.getByRole('button', { name: 'Select Job' }).click();
        await page.getByRole('heading', { name: 'A1' }).click();

    } catch (error) {
        console.error(error.message);
        await errorsteps(page);
    }
}
async function errorsteps(page) {
    await page.getByRole('button', { name: 'Submit Correction' }).click();
    await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
    await ss(page, 'Delayed meal');
    await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
}
test('Post correction enable and daily compliance disable', async ({ page }) =>{
    const username = "amrit.shah+9898@thoughts2binary.com";
    const password = "Test@121";
    // Go to the login page
    try {
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
        // enable Post correction daily attestation
        await page.getByRole('option', { name: 'ON' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();
        // enable Daily compliance
        await page.getByRole('row', { name: 'Edit Setting ENABLE DAILY' }).getByRole('img').click();
        await page.locator('.react-select__input-container').click();
        await page.getByRole('option', { name: 'Disable' }).click();
        await page.getByRole('button', { name: 'Submit' }).click();
        await ss(page, 'System settings');
        await page.getByRole('link', { name: 'Company logo amrit.shah+9898@' }).click();
        // await page.getByRole('menuitem', { name: 'Logout' }).click();
        const kioskusername = "1195-nojob";
        const kiokspassword = "Test@121";
        await page.goto('https://kiosk-staging.worksana.com/accounts/login')
        await page.getByRole('textbox', { name: 'Username' }).fill(kioskusername);
        await page.getByRole('textbox', { name: 'Password' }).fill(kiokspassword);
        await page.getByRole('button', { name: 'Sign in' }).click();
        // status = approved
        await kisok_search_login(page);
        await punchin(page);
        await page.getByRole('button', { name: 'Punchout' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Approve' }).click();
        await ss(page, 'approved');
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.getByText('Logout').click();
        // status submit correction
        await kisok_search_login(page);
        await punchin(page);
        await page.getByRole('button', { name: 'Punchout' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await page.getByRole('textbox', { name: 'Please leave a comment.*' }).fill('Test');
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await ss(page, 'Sumbit correction');
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.getByText('Logout').click();
        // status = dealyed meal
        await kisok_search_login(page);
        await punchin(page);
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
        // ststus = missing meal
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

        // status = Force punchout
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
        
        // status = missing punchin force punchout
        await kisok_search_login(page);
        await punchin(page);
        await page.waitForTimeout(480000);// wait for 8 minutes  till punchout
        await kisok_search_login(page);
        await page.getByRole('button', { name: 'Submit Correction' }).click();
        await page.locator('#feedback_iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();
        await ss(page, 'Missing punchin force punchout');
        await page.getByRole('button', { name: 'I approve my shiftSite Name' }).click();
        await page.getByText('Logout').click();

        // status = delayed meal force punchout
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
    }catch (error) {
        console.error('Error in test:', error.message);
        await errorsteps(page);
    }
    });