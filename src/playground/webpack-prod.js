const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// THIS FILENAME SHOULD BE: webpack.prod.js

//This page was made because the webpack production docs have changed: https://webpack.js.org/guides/production/

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map"
});