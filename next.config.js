const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
const path = require('path');

module.exports = function (phase, { defaultConfig }) {
  // when started in development mode `next dev` or `npm run dev`
  // regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';
  return {
    env: {
      API_URL: process.env.API_URL,
      COOKIE_NAME: process.env.API_URL,
      LOCAL_URL: process.env.LOCAL_URL,
      IS_DEV: isDev,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      const resolveModulesPaths = [
        path.resolve('./'),
      ];
      config.resolve.modules.push(...resolveModulesPaths);
      return config;
    },
  };
};
