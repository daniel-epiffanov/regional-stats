const isProd = process.env.NODE_ENV === 'production';
const PROD_HOST = 'https://regional-stats.herokuapp.com';
const DEV_HOST = 'http://localhost:5000';

export const HOST = isProd ? PROD_HOST : DEV_HOST;
export const HOST_API = isProd ? `${PROD_HOST}/api` : `${DEV_HOST}/api`;
