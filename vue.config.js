const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
  publicPath: './',
  outputDir: 'docs',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __INTLIFY_PROD_DEVTOOLS__: false,
      }),
    ]
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = pkg.productName || 'Slideshow';
        return args;
      });
  },
};
