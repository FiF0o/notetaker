
var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")


module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://localhost:5000',
        // 'webpack/hot/dev-server',
        // './src/index'
        './src/app/App'
    ],
    output: {
        path: __dirname,
        // filename: 'bundle.js',
        filename: 'index.js',
        // publicPath: '/static/'
    },
    resolve: {
        alias: [
            { _karma_webpack_: __dirname }
        ],
        extensions: ['', '.js', '.jsx'],
        // root: path.resolve(path.join(__dirname, 'src')),
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
                loaders: ['react-hot', 'babel-loader?presets[]=es2015&presets[]=react'],
                // query: {
                //     presets: ['es20215','react',]
                // }
            },
            {
                test: /\.(sass|scss)$/,
                loaders: [
                    "style-loader", // passing query parameter using ? instead of the object
                    "css-loader?sourceMap",
                    "sass-loader?sourceMap"
                ],
                exclude: [/vendors/, /bower_components/]
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
            
        ],
        postLoaders : [{
            test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
            loader: 'istanbul-instrumenter'
        }]
    }
};