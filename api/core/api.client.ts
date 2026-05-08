import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { allure } from 'allure-playwright';

interface ApiResponse<T> {
    code: number;                  // HTTP status code
    body: T;                       // Body JSON
    headers: Record<string, string>; // Response headers
}

export class ApiClient {
  static headers: Record<string, string> = {};
  static api: APIRequestContext;
  static baseURL: string = '';

  constructor(api: APIRequestContext) {}

  static async setHeaders(headers: Record<string, string>) {
    this.headers = { ...this.headers, ...headers };
  }

  static async setToken(token: string) {
    await this.setHeaders({ Authorization: `Bearer ${token}` });
  }

  static async init(hostName: string): Promise<APIRequestContext> {
    this.clearHeaders();
    this.baseURL = hostName;
    this.api = await request.newContext({
      baseURL: hostName,
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });
    this.clearToken();
    return this.api;
  }

  static clearToken() {
    delete this.headers['Authorization'];
  }

  static clearHeaders() {
    this.headers = {};
  }

  static async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
  const url = ApiClient._withQueryParams(endpoint, params);
  const res = await ApiClient.api.get(url, { headers: ApiClient.headers });

  await ApiClient._log('GET', url, undefined, res);

  const parsed = await ApiClient._parse<T>(res);

  return {
    code: res.status(),    // gọi function status()
    body: parsed,
    headers: res.headers(), // gọi function headers()
  };
}

static async post<T = any>(endpoint: string, data?: Record<string, any>): Promise<ApiResponse<T>> {
  const res = await ApiClient.api.post(endpoint, {
    data,
    headers: ApiClient.headers,
  });

  await ApiClient._log('POST', endpoint, data, res);

  const parsed = await ApiClient._parse<T>(res);

  return {
    code: res.status(),
    body: parsed,
    headers: res.headers(),
  };
}

static async put<T = any>(endpoint: string, data?: Record<string, any>): Promise<ApiResponse<T>> {
  const res = await ApiClient.api.put(endpoint, {
    data,
    headers: ApiClient.headers,
  });

  await ApiClient._log('PUT', endpoint, data, res);

  const parsed = await ApiClient._parse<T>(res);

  return {
    code: res.status(),
    body: parsed,
    headers: res.headers(),
  };
}

static async delete<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
  const url = ApiClient._withQueryParams(endpoint, params);
  const res = await ApiClient.api.delete(url, { headers: ApiClient.headers });

  await ApiClient._log('DELETE', url, undefined, res);

  const parsed = await ApiClient._parse<T>(res);

  return {
    code: res.status(),
    body: parsed,
    headers: res.headers(),
  };
}
// How to use to validate
// expect(response.code).toBe(201);
// expect(response.body).toHaveProperty('id');
// expect(response.body.name).toBe('Alice');


  static _withQueryParams(endpoint: string, params?: Record<string, any>): string {
  if (!params) return endpoint;
  const query = new URLSearchParams(params as any).toString();
  return `${endpoint}?${query}`;
}

  static async _parse<T>(res: APIResponse): Promise<T> {
    try {
        const contentType = res.headers()['content-type'] || '';

        if (contentType.includes('application/json')) {
            return await res.json() as T;
        }
        
        // Không phải JSON → trả object rỗng
        const text = await res.text();
        return { raw: text } as any;

    } catch (e) {
        // Không bao giờ throw
        return {} as T;
    }
  }

  static async _log(method: string, endpoint: string, body: any, res: APIResponse) {
    const status = res.status();
    const requestHeaders = ApiClient.headers;

    let responseBody: string;
    try {
      const contentType = res.headers()['content-type'] || '';
      responseBody = contentType.includes('application/json')
        ? JSON.stringify(await res.json(), null, 2)
        : await res.text();
    } catch {
      responseBody = '[Error parsing response body]';
    }

    const fullUrl = `${ApiClient.baseURL}${endpoint}`; // dùng biến baseURL

    console.log(`\n[${method}] ${fullUrl}`);
    if (Object.keys(requestHeaders).length)
      console.log('📥 Request Headers:', JSON.stringify(requestHeaders, null, 2));
    if (body) console.log('📦 Request Body:', JSON.stringify(body, null, 2));
    console.log(`📤 Response (${status}):\n`, responseBody);

    // Allure
    // await allure.step(`${method} ${fullUrl}`, async () => {
    //   if (Object.keys(requestHeaders).length)
    //     allure.attachment('Request Headers', JSON.stringify(requestHeaders, null, 2), 'application/json');
    //   if (body)
    //     allure.attachment('Request Body', JSON.stringify(body, null, 2), 'application/json');
    //   allure.attachment('Response Body', responseBody, 'application/json');
    //   allure.attachment('Status Code', status.toString(), 'text/plain');
    // });
  }
}
