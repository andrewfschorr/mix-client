const path = require('path');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    cssModules: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        const resolveModulesPaths = [
            path.resolve('./'),
        ];
        config.resolve.modules.push(...resolveModulesPaths);
        return config;
    },
});