import { mfaTest as test } from '../fixtures/auth.fixture';
import { CompanyPage } from '../pages/company.page';
import { verifyCompanyCreated } from '../assertions/company.assert';
import { companyData } from '../data/company/company.data';
import { allure } from 'allure-playwright/dist';

test.describe('Company page', () => {
    test('[@company_01] Add new company @company', async ({ page }) => {
        const companyPage = new CompanyPage(page);
        const data = companyData.company_01();

        await allure.step('[Step_1]: Open popup New Company', async () => {
            await companyPage.openAddNewCompanyPopup();
        });

        await allure.step('[Step_2]: Submit new company', async () => {
            await companyPage.submitCompany(data);
        });

        await allure.step('[Step_3]: Verify Company created', async () => {
            await verifyCompanyCreated(data.name);
        });
    });

});
