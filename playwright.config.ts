import { defineConfig, devices } from '@playwright/test';
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
    timeout: 10 * 1000
  },
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL,
    headless: process.env.HEADLESS !== 'false',
    viewport: null,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10 * 1000,
    navigationTimeout: 20 * 1000,
    ...basicAuthUse,
  },
  projects: [
    {
      name: 'Chromium',
      use: devices['Desktop Chrome'],
    },
    // {
    //   name: 'Firefox',
    //   use: devices['Desktop Firefox'],
    // },
    // {
    //   name: 'WebKit',
    //   use: devices['Desktop Safari'],
    // },
  ],
   outputDir: 'test-results',
});