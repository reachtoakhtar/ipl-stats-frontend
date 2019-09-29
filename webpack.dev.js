/**
 * Created by Akhtar on 19/07/2019.
 */

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname) + '/.env.development'
const fileEnv = dotenv.config({ path: envPath }).parsed
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});


module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    open: false,
    historyApiFallback: true
  },
  plugins: [
    ...common.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(envKeys)
  ]
});
