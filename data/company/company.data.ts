export type CompanyData = {
    name: string;
    latitude: string;
    longitude: string;
    currency: string;
};

export const companyData = {
    company_01: (): CompanyData => ({
        name: `Test Company ${Date.now()}`,
        latitude: '-33.8688',
        longitude: '151.2093',
        currency: 'Australian dollar',
    }),
    company_02: (): CompanyData => ({
        name: `Test Company ${Date.now()}`,
        latitude: '51.5074',
        longitude: '-0.1278',
        currency: 'Pound sterling',
    }),
} satisfies Record<string, () => CompanyData>;

export type CompanyTestKey = keyof typeof companyData;
