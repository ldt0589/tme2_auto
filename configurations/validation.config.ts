export function validateEnv() {
  const required = ['USERNAME', 'PASSWORD'];

  required.forEach(key => {
    if (!process.env[key]) {
      throw new Error(`❌ Missing environment variable: ${key}`);
    }
  });

  if (process.env.BASIC_AUTH_ENABLED === 'true') {
    const basicAuthRequired = ['BASIC_AUTH_USER', 'BASIC_AUTH_PASS'];

    basicAuthRequired.forEach(key => {
      if (!process.env[key]) {
        throw new Error(`❌ Missing environment variable: ${key}`);
      }
    });
  }
}