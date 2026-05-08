import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';
import { MfaSelectors } from '../selectors/mfa.selector';
import { authenticator } from 'otplib';

export class MfaPage extends BasePage {
    private readonly mfaInput: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.mfaInput = page.locator(MfaSelectors.mfaInput);
        this.submitButton = page.locator(MfaSelectors.submitButton);
    }

    generateCode(secret: string): string {
        const code = authenticator.generate(secret);
        console.log(`[MfaPage] MFA code generated: ${code}`);
        return code;
    }

    async enterCode(code: string) {
        console.log(`[MfaPage] Entering MFA code: ${code}`);
        await this.mfaInput.fill(code);
        await this.submitButton.click();
        console.log('[MfaPage] MFA submitted');
    }
}
