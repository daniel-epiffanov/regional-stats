const isProd = process.env.NODE_ENV === 'production';
const prodHost = 'production.com';
const devHost = 'http://localhost:5000';

exports.host = isProd ? prodHost : devHost;
exports.hostApi = isProd ? prodHost : `${devHost}/api`;
