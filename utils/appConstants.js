// Cant use object destructing, according to NextJS, who knows...
const API_URL = process.env.API_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;
const IS_DEV = process.env.IS_DEV;

export {
  API_URL,
  COOKIE_NAME,
  IS_DEV,
};
