import { expect, mfaTest as test } from '../fixtures/auth.fixture';
import { allure } from 'allure-playwright/dist';

test.describe('Login', () => {
    test('[@login_01] Login successfully with valid credentials @login', async ({ page }) => {
        await allure.step('[Step_1]: Verify login was successful by checking URL', async () => {
            await expect(page).toHaveURL(/transportme\/company/);
        });
    });
});
