const ArchivePlugin = require('webpack-archive-plugin')

module.exports = {
  outputDir: 'dist/static/',
  assetsDir: 'assets',
  filenameHashing: false,
  css: {
    extract: true
  },
  configureWebpack: {}
}

if (process.env.NODE_ENV === 'production') {
  module.exports.configureWebpack.plugins = [
    new ArchivePlugin()
  ]
}
