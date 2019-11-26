const path = require('path');
const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS({
  cssModules: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    COOKIE_NAME: process.env.COOKIE_NAME,
    IS_DEV: process.env.NODE_ENV === 'development',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const resolveModulesPaths = [
      path.resolve('./'),
    ];
    config.resolve.modules.push(...resolveModulesPaths);
    return config;
  },
});
