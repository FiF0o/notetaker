var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // context: __dirname,
    context: __dirname,
    devtool: 'sourcemap',
    // entry: {
    //     'index':'/src/app/App.js',
    // },
    entry: {
        app: path.join(__dirname, "src/app/App.js")
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js',
        
        // added publicPath
        // publicPath: "./"
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
            },
            // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
          
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