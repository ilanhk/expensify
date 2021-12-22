const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


//This page was made because the webpack production docs have changed: https://webpack.js.org/guides/production/

module.exports = {
    entry: './src/app.js', //need to tell webpack where it should start (the file that runs the app)
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Production',
        })
      ],
    output: {
        path:path.join(__dirname, 'public'), // this is the absoulute path on the machine to where i need to output that webpack file
        filename:'bundle.js', // bundle.js is a very common filename for webpack. but can name the filename to anything
        clean: true
    }
};