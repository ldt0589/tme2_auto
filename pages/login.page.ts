import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';
import { LoginSelectors } from '../selectors/login.selector';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator(LoginSelectors.usernameInput);
        this.passwordInput = page.locator(LoginSelectors.passwordInput);
        this.loginButton = page.locator(LoginSelectors.loginButton);
    }

    async openHomePage() {
        console.log('[LoginPage] Navigating to home page');
        await this.navigate('/');
        console.log('[LoginPage] Home page loaded');
    }

    async login(username: string, password: string) {
        console.log(`[LoginPage] Filling credentials for user: "${username}"`);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        console.log('[LoginPage] Login form submitted');
    }
}
