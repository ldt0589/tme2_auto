import { ApiClient } from '../core/api.client';
import { getEnvConfig } from '../../configurations/env.config';
import { fetchAccessToken } from '../auth/auth.api';

export async function fetchCompanies() {
    const { apiBaseURL, clientId } = getEnvConfig();
    await fetchAccessToken();

    await ApiClient.init(apiBaseURL);
    await ApiClient.setHeaders({ 'x-access-token': (globalThis as any).accessToken });
    const response = await ApiClient.get(`/api/v3/companies`, { client: clientId });

    return response;
}
