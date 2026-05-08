import { defineConfig } from '@playwright/test';
import { validateEnv } from './configurations/validation.config';
import dotenv from 'dotenv';
import { getEnvConfig } from './configurations/env.config';
import { getBasicAuthConfig } from './configurations/auth.config';

dotenv.config();
validateEnv();
const { baseURL } = getEnvConfig();
const basicAuthUse = getBasicAuthConfig();

export default defineConfig({
  testDir: './tests',
  timeout: 300 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL,
    headless: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 20 * 1000,
    navigationTimeout: 30 * 1000,
    ...basicAuthUse,
  },
  projects: [
    {
      name: 'chrome',
      use: { browserName: 'chromium' },
    },
  ],
});
