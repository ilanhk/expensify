const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


// THIS FILENAME SHOULD BE: webpack.dev.js

//This page was made because the webpack production docs have changed: https://webpack.js.org/guides/production/

// module.exports = merge(common, {
//     mode: 'development',
//     devtool:'eval-cheap-module-source-map', // this debugs the whole app and makes it easier for us to find mistakes if there is any
//     devServer: {
//         static: path.join(__dirname, 'public'), // this instead of live-server needs the absolute path of public
//         historyApiFallback: true //this to tells the devserver that we are handling routing via Client side code and it should return index.hml for all 404 routes. In order to allow multiple pages.
//     }
// });

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
      static: path.join(__dirname, "public"),
      historyApiFallback: true
    }
  });

