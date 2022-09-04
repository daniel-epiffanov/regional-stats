const isProd = process.env.NODE_ENV === 'production';
const prodHost = 'production.com';
const devHost = 'http://localhost:5000';

export const host = isProd ? prodHost : devHost;
export const hostApi = isProd ? prodHost : `${devHost}/api`;
