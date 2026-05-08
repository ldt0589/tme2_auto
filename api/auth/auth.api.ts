import { ApiClient } from '../core/api.client';
import { AuthConfig } from '../../configurations/auth.config';
import { getEnvConfig } from '../../configurations/env.config';
import { expect } from '@playwright/test';

export async function fetchAccessToken() {
  const { apiBaseURL } = getEnvConfig();

  await ApiClient.init(apiBaseURL);
  await ApiClient.setHeaders({'x-app-type': 'web-coach',});
  const response = await ApiClient.post('/api/auth/login_lite', {
    "email": AuthConfig.username,
    "password": AuthConfig.password,
    "agent": "web"
  });
  expect(response.code).toBe(200);

  (globalThis as any).accessToken = response.body.token;
  console.log('Fetch access token successfully...');
  return response.body.token;
}