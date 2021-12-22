//webpack documentation - https://webpack.js.org/
//documentation for node path.join() https://nodejs.org/api/path.html#path_path_join_paths
//must have webpack.config.js file in the root of the folder

const path = require('path');

// THIS FILENAME WAS: webpack.config.js

// __dirname will show you the full path of the file

//Entry --> output

module.exports = {
    entry: './src/app.js', //need to tell webpack where it should start (the file that runs the app)
    output: {
        path:path.join(__dirname, 'public'), // this is the absoulute path on the machine to where i need to output that webpack file
        filename:'bundle.js' // bundle.js is a very common filename for webpack. but can name the filename to anything
    },
    module: {
        rules:[{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, // this pretty much means if you see a .js file run it through babel-loader and exclude all files in 'node_modules' folder.
        {
            test: /\.s?css$/, //? will make the s optional so that it can support css and scss files
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ],
        }] // need to create this rule to use css and scss(sass-loader)
    },
    devtool:'eval-cheap-module-source-map', // this debugs the whole app and makes it easier for us to find mistakes if there is any
    devServer: {
        static: path.join(__dirname, 'public'), // this instead of live-server needs the absolute path of public
        historyApiFallback: true //this to tells the devserver that we are handling routing via Client side code and it should return index.hml for all 404 routes. In order to allow multiple pages.
    }
};

//Loader - allows us to customise the behavior of webpack when it loads a given file
// the value of loader is the type of loader we are using. In this case its 'babel-loader'
//the value for test is a Regular expression which means that its only looking for a files that ends with '.js' which would be the only ones allowed to run through babel.
//exclude is to allow us to exclude whatever files. In this case the whole 'node_modules' folder
