const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');
const base = require('./webpack.base');

const config = (env, options) => ({
  ...base,
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          publicPath: './',
          name: '[name].[ext]',
          limit: 10000,
        },
      },
    ],
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: options.port || 3000,
    client: {
      overlay: true,
      progress: true,
      logging: 'error',
    },
    historyApiFallback: true,
  },
  stats: 'errors-only',
  plugins: [
    ...base.plugins,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: pkg.productName,
      minify: {
        html5: true,
      }
    }),
  ],
});

module.exports = config;
