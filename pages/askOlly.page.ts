import { BasePage } from './base.page';
import { expect, Locator, Page } from '@playwright/test';
import { AskOllySelectors } from '../selectors/askOlly.selector';

export class AskOllyPage extends BasePage {
    private readonly askInput: Locator;
    private readonly sendButton: Locator;
    private readonly newChatButton: Locator;
    private readonly okButton: Locator;
    private readonly likeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.askInput = page.locator(AskOllySelectors.askInput);
        this.sendButton = page.locator(AskOllySelectors.sendButton);
        this.newChatButton = page.getByRole(AskOllySelectors.newChatButton.role, { name: AskOllySelectors.newChatButton.name });
        this.okButton = page.getByRole(AskOllySelectors.okButton.role, { name: AskOllySelectors.okButton.name });
        this.likeButton = page.locator(AskOllySelectors.likeButton);
    }

    async clickSend() {
        // await this.sendButton.waitFor({ state: 'visible' });
        await expect(this.sendButton).toBeEnabled();
        await this.sendButton.click();
    }

    async startNewChat() {
        await this.newChatButton.click();
        const modal = this.page.locator('.ui.modal.visible.active');
        await this.okButton.click();
    }

    async ask(question: string) {
        await this.askInput.fill(question);
        await this.clickSend();
        console.log(`Asked Olly with question "${question}"`);
    }

    async waitForOllyResponse(timeout = 40000) {
        const start = Date.now();
        const response = await this.page.waitForResponse(
            res =>
            res.url().includes('/ai/v1/olly-bi/sessions/') &&
            res.request().method() === 'POST' &&
            res.status() === 200,
            { timeout }
        );

        console.log(`Olly responded DONE after ${Date.now() - start} ms`);
        const json = await response.json();
        return json.content;
    }

    async waitForStreamDone() {
        await this.likeButton.waitFor({ state: 'visible' });
        console.log(`Message streams DONE`);
    }
}
