const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const { i18n } = require('./next-i18next.config')

module.exports = withBundleAnalyzer({
  i18n,
  future: {
    webpack5: true
  },
  images: {
    // 图片压缩
    formats: ['image/avif', 'image/webp'],
    domains: ['image.panewslab.com','cdn-img.panewslab.com']
  },
  async rewrites() {
    return [
      {
        source: '/:path*.html',
        destination: '/:path*'
      }
    ]
  },
  webpack(config, { dev, isServer }){
    // Replace React with Preact only in client production build
    config.resolve.fallback = {fs: false, tls: false, http2: false, dgram: false}
    return config
  }
})
