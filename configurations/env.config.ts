type EnvConfig = {
  baseURL: string;
  apiBaseURL: string;
  clientId: string;
};

const configs: Record<'test' | 'staging' | 'production', EnvConfig> = {
  test: {
    baseURL: 'https://test.transportme.com.au/',
    apiBaseURL: 'https://test.transportme.com.au/',
    clientId: '6569b27da3479a001ee751ad',
  },
  staging: {
    baseURL: 'https://dev-staging.transportme.com.au',
    apiBaseURL: 'https://dev-staging.transportme.com.au',
    clientId: '6569b27da3479a001ee751ad',
  },
  production: {
    baseURL: 'https://api.transportme.com.au/',
    apiBaseURL: 'https://api.transportme.com.au/',
    clientId: '6569b27da3479a001ee751ad',
  }
};

export function getEnvConfig(): EnvConfig {
  const env = (process.env.ENV || 'staging') as keyof typeof configs;

  if (!configs[env]) {
    throw new Error(`Invalid ENV value: ${env}`);
  }

  return configs[env];
}
