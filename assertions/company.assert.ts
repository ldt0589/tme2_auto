import { expect } from '@playwright/test';
import { fetchCompanies } from '../api/company/company.api';

export async function verifyCompanyCreated(companyName: string) {
    const response = await fetchCompanies();

    expect(response.code).toBe(200);

    const companies: any[] = response.body?.data ?? response.body;
    const found = companies.some((c: any) => c.name === companyName);

    expect(found, `Company "${companyName}" not found in API response`).toBe(true);
    console.log(`Verified company "${companyName}" was created successfully`);
}
