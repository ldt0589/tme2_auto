import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';
import { CompanySelectors } from '../selectors/company.selector';

export class CompanyPage extends BasePage {
    private readonly addNewCompanyBtn: Locator;
    private readonly comNameInput: Locator;
    private readonly latitudeInput: Locator;
    private readonly longitudeInput: Locator;
    private readonly currencyDropdown: Locator;
    private readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addNewCompanyBtn = page.locator(CompanySelectors.addNewCompanyBtn);
        this.comNameInput = page.locator(CompanySelectors.comNameInput);
        this.latitudeInput = page.locator(CompanySelectors.latitudeInput);
        this.longitudeInput = page.locator(CompanySelectors.longitudeInput);
        this.currencyDropdown = page.locator(CompanySelectors.currencyDropdown);
        this.saveButton = page.locator(CompanySelectors.saveButton);
    }

    async openAddNewCompanyPopup() {
        await this.addNewCompanyBtn.click();
    }

    async fillCompanyName(name: string) {
        await this.comNameInput.fill(name);
    }

    async fillLatitude(value: string) {
        await this.latitudeInput.fill(value);
    }

    async fillLongitude(value: string) {
        await this.longitudeInput.fill(value);
    }

    async selectCurrency(currency: string) {
        await this.currencyDropdown.click();
        await this.page.getByRole('option', { name: currency }).click();
    }

    async save() {
        await this.saveButton.click();
    }

    async submitCompany(data: { name: string; latitude: string; longitude: string; currency: string }) {
        await this.fillCompanyName(data.name);
        await this.fillLatitude(data.latitude);
        await this.fillLongitude(data.longitude);
        await this.selectCurrency(data.currency);
        await this.save();
    }
}
