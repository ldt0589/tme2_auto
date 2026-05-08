import { Locator, Page } from '@playwright/test';
export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected locator(selector: string): Locator {
        return this.page.locator(selector);
    }

    async navigate(path: string = '/') {
        try {
            await this.page.goto(path, { waitUntil: 'domcontentloaded' });
        } catch (error) {
            console.error(`❌ Failed to navigate to ${path}:`, error);
            throw error;
        }
    }

    async highlightAndClick(locator: Locator) {
        await locator.evaluate(el => {
            el.style.outline = '3px solid red';
        });
        await locator.click();
    }

    async click(selector: string) {
        await this.page.click(selector);
    }

    async fill(selector: string, value: string) {
        await this.page.fill(selector, value);
    }

}