/* eslint-disable */
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n,
  images: {
    domains: ['storage.yandexcloud.net'],
    dangerouslyAllowSVG: true,
  },
  webpack: config => {
    // camelCase style names from css modules
    config.module.rules
      .find(({ oneOf }) => !!oneOf)
      .oneOf.filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
      .reduce((acc, { use }) => acc.concat(use), [])
      .forEach(({ options }) => {
        if (options.modules) {
          // eslint-disable-next-line no-param-reassign
          options.modules.exportLocalsConvention = 'camelCase'
        }
      })

    return config
  },
}

module.exports = nextConfig
