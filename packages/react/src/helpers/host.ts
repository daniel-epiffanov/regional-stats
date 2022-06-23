const prod = process.env.NODE_ENV === 'production';
const prodHost = 'production.com';
const devHost = 'http://localhost:5000';

export const host = prod ? prodHost : devHost;
export const hostApi = prod ? prodHost : `${devHost}/api`;
