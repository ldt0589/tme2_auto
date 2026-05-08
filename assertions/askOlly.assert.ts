import { expect, Page } from "@playwright/test";
import { AskOllySelectors } from "../selectors/askOlly.selector";

export async function verifyMessageContainerReseted(page: Page) {
    const messageContainer = AskOllySelectors.messageContainer;
    await expect(page.locator(messageContainer)).toHaveCount(0);
    console.log('Verified message container is reseted');
}

export async function verifyAskOllyURLReseted(page: Page) {
    await expect(page).toHaveURL(/\/home\/ask-olly$/);
    console.log('Verified Ask Olly URL is reseted');
}

export async function verifyMessageCount(page: Page, expectedMessageCount: number) {
    const messageContainer = AskOllySelectors.messageContainer;
    const messages = page.locator(`${messageContainer} section > div > div`);
    
    await expect(messages).toHaveCount(expectedMessageCount+1);
    console.log(`Verified Conversation has ${expectedMessageCount} messages`);
}