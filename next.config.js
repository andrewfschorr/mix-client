const path = require('path');
const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS({
  cssModules: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const resolveModulesPaths = [
      path.resolve('./'),
    ];
    config.resolve.modules.push(...resolveModulesPaths);
    return config;
  },
});
