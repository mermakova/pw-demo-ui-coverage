import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
import { testPlanFilter } from "allure-playwright/dist/testplan";

require('dotenv').config();

export default defineConfig<TestOptions>({

  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './spec',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : 2,

  // Reporting reporting
  grep: testPlanFilter(),
  reporter: [["line"], ['html'], [
    "allure-playwright",
    {
      detail: true,
      outputFolder: "allure-results",
      suiteTitle: true,
      categories: [
        {
          name: "Outdated tests",
          messageRegex: ".*FileNotFound.*",
        },
      ],
      environmentInfo: {
        framework: "playwright",
      },
    },
  ]],


  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
    video: 'on'
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'iOS',
      grep: /@iOS/,
      use: {
        ...devices['iPhone 13 Pro']
      },
    },
  ],
  webServer: {
    timeout: 5 * 60 * 1000,
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }
});