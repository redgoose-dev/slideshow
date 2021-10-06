const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./webpack.base');

const config = () => ({
  ...base,
  entry: {
    slideshow: path.resolve(__dirname, '../src/exports.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: `[name].js`,
    clean: true,
    library: {
      name: 'slideshow',
      type: 'commonjs-module',
      export: 'default',
    },
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
  externals: {
    'vue': 'vue',
    'vue-i18n/index': 'vue-i18n',
    'vuex': 'vuex',
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    ...base.plugins,
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: { comments: false },
        },
        extractComments: false,
      }),
    ],
  },
});

module.exports = config;
