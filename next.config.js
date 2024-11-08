const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  future: {
    webpack5: true,
  },
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
  },
});
