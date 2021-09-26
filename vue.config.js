const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const dev = process.env.NODE_ENV !== 'production';
let config = {
  publicPath: './',
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

if (dev)
{
  config.chainWebpack = config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = pkg.productName || 'Slideshow';
        return args;
      });
  };
}

// exports
module.exports = config;
