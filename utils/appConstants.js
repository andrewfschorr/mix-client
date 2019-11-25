import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_URL, COOKIE_NAME } = publicRuntimeConfig;
export { API_URL, COOKIE_NAME };
