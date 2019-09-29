/**
 * Created by Akhtar on 19/07/2019.
 */


const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname) + '/.env.production'
const fileEnv = dotenv.config({ path: envPath }).parsed
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});


module.exports = merge(common, {
  mode: 'production',
  plugins: [
    ...common.plugins,
    new webpack.DefinePlugin(envKeys)
  ]
});
