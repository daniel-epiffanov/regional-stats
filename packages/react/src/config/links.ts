const isProd = process.env.NODE_ENV === 'production';
const PROD_HOST = 'production.com';
const DEV_HOST = 'http://localhost:5000';

export const HOST = isProd ? PROD_HOST : DEV_HOST;
export const HOST_API = isProd ? PROD_HOST : `${DEV_HOST}/api`;

export const GITHUB_LINK = 'https://github.com/daniel-epiffanov';
export const TELEGRAM_LINK = 'https://t.me/danielEpifanov';