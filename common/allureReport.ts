import { allure } from 'allure-playwright';

export async function step<T>(name: string, body: () => Promise<T>): Promise<T> {
  return await allure.step(name, body);
}

// Log plain text
export function logText(name: string, message: string): void {
  allure.attachment(name, message, 'text/plain');
}

// Log JSON
export function logJson(name: string, data: any): void {
  const json = JSON.stringify(data, null, 2);
  allure.attachment(name, json, 'application/json');
}

// Log HTML
export function logHtml(name: string, html: string): void {
  allure.attachment(name, html, 'text/html');
}

// Log Screenshot
export async function logScreenshot(name: string, page: any): Promise<void> {
  const buffer = await page.screenshot();
  allure.attachment(name, buffer, 'image/png');
}

let logBuffer: string[] = [];

export function logToAllure(message: string): void {
  console.log(message);
  logBuffer.push(message);
}

export function flushAllureLogs(title = 'Step Logs') {
  if (logBuffer.length > 0) {
    allure.attachment(title, logBuffer.join('\n'), 'text/plain');
    logBuffer = [];
  }
}