const path = require('path');

module.exports = {
  publicPath: './',
  outputDir: 'docs',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.join(__dirname, 'src'),
      }
    },
  },
};
