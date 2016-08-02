var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: 'sourcemap',
    entry: {
        'index':'./app/App.js',
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /(node_modules)/, loader: 'babel' },
            { test: /\.json$/, loader: 'json'},
            {
                test: /\.(sass|scss)$/,
                loaders: [
                    "style-loader", // passing query parameter using ? instead of the object
                    "css-loader?sourceMap",
                    "sass-loader?sourceMap"
                ],
                exclude: [/vendors/, /bower_components/]
            }
        ]
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new ExtractTextPlugin('[name].css', { allChunks: true }),
        new HtmlWebpackPlugin({filename: 'index.html', template: 'src/index.html', inject: 'body', hash: 'true'}),
        new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify('development')}})
    ],
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    }
};