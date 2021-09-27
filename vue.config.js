const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const MODE = { docs: 'docs', libs: 'libs', dev: 'dev' };
const mode = process.env.MODE || 'dev';

// set config
let config = {
  publicPath: './',
  configureWebpack: {
    output: {},
    resolve: {
      alias: { '~': path.resolve(__dirname, 'src') }
    },
    plugins: [
      new webpack.DefinePlugin({
        __INTLIFY_PROD_DEVTOOLS__: false,
      }),
    ]
  },
};

// set config with mode
switch (mode)
{
  case MODE.dev:
    break;
  case MODE.docs:
    config.outputDir = 'docs';
    config.productionSourceMap = false;
    config.configureWebpack.entry = './src/main.js';
    break;
  case MODE.libs:
    config.pages = {
      slideshow: {
        entry: './src/exports.js',
      },
    };
    config.css = {
      extract: {
        filename: '[name].css',
      }
    }
    config.outputDir = 'dist';
    config.filenameHashing = false;
    config.productionSourceMap = false;
    config.configureWebpack.plugins = [
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ];
    config.configureWebpack.output = {
      filename: '[name].js',
      library: 'slideshow',
      libraryTarget: 'umd',
      libraryExport: 'default',
    };
    break;
}

// chain webpack
config.chainWebpack = config => {
  switch (mode)
  {
    case MODE.dev:
      config.plugin('html').tap(args => {
        args[0].title = pkg.productName || 'Slideshow';
        return args;
      });
      break;
    case MODE.docs:
      config.plugin('html').tap(args => {
        args[0].title = pkg.productName || 'Slideshow';
        return args;
      });
      break;
    case MODE.libs:
      config.optimization.delete('splitChunks');
      config.plugins.delete('html-slideshow');
      config.plugins.delete('preload-slideshow');
      config.plugins.delete('prefetch-slideshow');
      break;
  }
};

// exports
module.exports = config;
