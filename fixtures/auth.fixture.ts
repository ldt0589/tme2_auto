import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { MfaPage } from '../pages/mfa.page';
import { AuthConfig } from '../configurations/auth.config';

type Fixtures = {
  loginPage: LoginPage;
  mfaPage: MfaPage;
};

export const loginTest = base.extend<Fixtures>({
  loginPage: [async ({ page }, use) => {
    console.log('[Fixture] Browser/page ready — setting up loginPage fixture...');
    const loginPage = new LoginPage(page);
    await loginPage.openHomePage();
    await loginPage.login(AuthConfig.username, AuthConfig.password);
    console.log('[Fixture] Login submitted — waiting for MFA...');
    await use(loginPage);
  }, { auto: true }],
  mfaPage: [async ({ page }, use) => {
    await use(new MfaPage(page));
  }, { auto: true }],
});

export const mfaTest = loginTest.extend<Fixtures>({
  mfaPage: async ({ page, loginPage: _loginPage }, use) => {
    console.log('[Fixture] Setting up mfaPage fixture...');
    const mfaPage = new MfaPage(page);
    const mfaCode = mfaPage.generateCode(AuthConfig.mfaSecret);
    await mfaPage.enterCode(mfaCode);
    console.log('[Fixture] MFA complete — test starting...');
    await use(mfaPage);
  },
});

export { expect } from '@playwright/test';
