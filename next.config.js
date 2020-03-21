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
      API_URL: 'https://mixapp.test',
      COOKIE_NAME: 'whiskyNeat',
      LOCAL_URL: 'http://localhost:3000',
      IS_DEV: true,
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

// module.exports = withCSS({
//   cssModules: true,
//   env: {
//     API_URL: '@api-url',
//     COOKIE_NAME: '@cookie-name',
//     LOCAL_URL: '@local-url',
//     IS_DEV: process.env.NODE_ENV === 'development',
//     // API_URL: 'https://mixapp.test',
//     // COOKIE_NAME: 'whiskyNeat',
//     // LOCAL_URL: 'http://localhost:3000',
//     // IS_DEV: true,
//   },
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     const resolveModulesPaths = [
//       path.resolve('./'),
//     ];
//     config.resolve.modules.push(...resolveModulesPaths);
//     return config;
//   },
// });

