import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const {
  API_URL,
  COOKIE_NAME,
  IS_DEV,
  LOCAL_URL,
} = publicRuntimeConfig;

export {
  API_URL,
  COOKIE_NAME,
  IS_DEV,
  LOCAL_URL,
};
