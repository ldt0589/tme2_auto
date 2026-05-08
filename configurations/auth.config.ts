export const AuthConfig = {
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,
  mfaSecret: process.env.MFA_SECRET!,
  basicAuthEnabled: process.env.BASIC_AUTH_ENABLED === 'true',
  basicAuthUser: process.env.BASIC_AUTH_USER,
  basicAuthPass: process.env.BASIC_AUTH_PASS,
};

export function getBasicAuthConfig(): Record<string, any> {
  if (AuthConfig.basicAuthEnabled && AuthConfig.basicAuthUser && AuthConfig.basicAuthPass) {
    return {
      httpCredentials: {
        username: AuthConfig.basicAuthUser,
        password: AuthConfig.basicAuthPass,
      },
    };
  }
  return {};
}
