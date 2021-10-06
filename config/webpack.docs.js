const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./webpack.base');
const pkg = require("../package.json");

const paths = {
  assets: 'assets',
};

const config = () => ({
  ...base,
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, '../docs'),
    publicPath: './',
    filename: `${paths.assets}/[name].[contenthash:6].js`,
    chunkFilename: `${paths.assets}/chunk-[name].[contenthash:6].js`,
    clean: true,
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
          name: `${paths.assets}/[name].[ext]`,
          limit: 10000,
        },
      },
    ],
  },
  externals: {},
  plugins: [
    ...base.plugins,
    new MiniCssExtractPlugin({ filename: `${paths.assets}/[name].[contenthash:6].css` }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: pkg.productName,
      minify: {
        html5: true,
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/favicon.ico', to: '' },
        { from: 'public/manifest.json', to: '' },
        { from: 'public/assets', to: paths.assets },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: { comments: false },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});

module.exports = config;
