const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // extract-text-webpack-plugin has been depreciated they told me to go to here: https://github.com/webpack-contrib/mini-css-extract-plugin

//THIS FILENAME SHOULD BE: webpack.common.js


//This page was made because the webpack production docs have changed: https://webpack.js.org/guides/production/

// module.exports = {
//     entry: './src/app.js', //need to tell webpack where it should start (the file that runs the app)
//     plugins: [new MiniCssExtractPlugin()],
//     output: {
//         path:path.join(__dirname, 'public'), // this is the absoulute path on the machine to where i need to output that webpack file
//         filename:'bundle.js', // bundle.js is a very common filename for webpack. but can name the filename to anything
//         clean: true
//     }
// };

module.exports = {
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    }
  };