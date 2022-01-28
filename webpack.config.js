//webpack documentation - https://webpack.js.org/
//documentation for node path.join() https://nodejs.org/api/path.html#path_path_join_paths
//must have webpack.config.js file in the root of the folder

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // extract-text-webpack-plugin has been depreciated they told me to go to here: https://github.com/webpack-contrib/mini-css-extract-plugin
const webpack  = require('webpack');

// THIS FILENAME WAS: webpack.config.js

// __dirname will show you the full path of the file

//Entry --> output

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test'});
} else if (process.env.NODE_ENV === 'development'){
    require('dotenv').config({ path: '.env.development'});
}

module.exports = (env)=>{
    const isProduction = env === 'production';

    return {
        entry: ['babel-polyfill', './src/app.js'], //need to tell webpack where it should start (the file that runs the app) can be a single string or an array of strings. docs for babel-polyfill: https://babeljs.io/docs/en/babel-polyfill
        output: {
            path:path.join(__dirname, 'public', 'dist'), // this is the absoulute path on the machine to where i need to output that webpack file
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
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ],
            }] // need to create this rule to use css and scss(sass-loader)
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY' : JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN' : JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL' : JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID' : JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET' : JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER' : JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER),
                'process.env.FIREBASE_APP_ID' : JSON.stringify(process.env.FIREBASE_APP_ID),
                'process.env.FIREBASE_MEASUREMENT_ID' : JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
            })
        ],
        devtool: isProduction ? 'source-map': 'inline-source-map', // this debugs the whole app and makes it easier for us to find mistakes if there is any
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        devServer: {
            static: path.join(__dirname, 'public'), // this instead of live-server needs the absolute path of public
            historyApiFallback: true, //this to tells the devserver that we are handling routing via Client side code and it should return index.hml for all 404 routes. In order to allow multiple pages.
            devMiddleware: {
                publicPath: '/dist/',

              },
        }
    };
    
};


//Loader - allows us to customise the behavior of webpack when it loads a given file
// the value of loader is the type of loader we are using. In this case its 'babel-loader'
//the value for test is a Regular expression which means that its only looking for a files that ends with '.js' which would be the only ones allowed to run through babel.
//exclude is to allow us to exclude whatever files. In this case the whole 'node_modules' folder
