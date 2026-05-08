import { BasePage } from './base.page';
import { expect, Locator, Page } from '@playwright/test';
import { MenuSelectors } from '../selectors/menu.selector';

export class ClientPage extends BasePage {
    private readonly askOllyMenu: Locator;

    constructor(page: Page) {
        super(page);
        this.askOllyMenu = page.locator(MenuSelectors.askOllyMenu);
    }

    async openAskOllyPage(){
        await this.askOllyMenu.click();
    }
}
