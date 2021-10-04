const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const base = require('./webpack.base');

const config = (env, options) => ({
  ...base,
  entry: {
    slideshow: {
      import: path.resolve(__dirname, '../src/exports.js'),
      dependOn: 'vendor',
    },
    vendor: [ 'vue', 'vue-i18n/index', 'vuex' ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: `[name].js`,
    clean: true,
    // library: {
    //   name: 'Slideshow',
    //   type: 'module',
    // },
    libraryTarget: 'module',
    // globalObject: 'this',
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          publicPath: './',
          name: 'assets/[name].[ext]',
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    ...base.plugins,
    // new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
  optimization: {
    // runtimeChunk: 'single',
    minimize: false,
    // minimizer: [
    //   new TerserPlugin({
    //     terserOptions: {
    //       format: { comments: false },
    //     },
    //     extractComments: false,
    //   }),
    // ],
    // splitChunks: {
    //   chunks: 'all',
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   cacheGroups: {
    //     commons: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendor',
    //       chunks: 'initial',
    //     },
    //   },
    // },
  },
});

module.exports = config;
