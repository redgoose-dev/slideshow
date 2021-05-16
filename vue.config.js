const path = require('path');
const webpack = require('webpack');

const development = process.env.NODE_ENV === 'development';

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
};
