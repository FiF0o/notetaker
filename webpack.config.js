const webpack = require('webpack')

const path = require('path')
const sassLintPlugin = require('sasslint-webpack-plugin')
const packageJson = require('./package.json')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

module.exports = {
  // base dir for resolving entry option - src/ will be root dir
  context: path.join(__dirname, 'src'),
  entry: {
    //format path to be ./app/App.js as input file
    app: path.format({
      dir: './app',
      base: 'App.js'
    }),

    // vendors: [''],
  },
  output: {
    path: path.join(__dirname, 'public'),
    /* reference for web browser - is needed to specify the path -
    Will be using path as base and then add assets to match ./public/assets
    - --content-base public/ needs to passed as a flag
     assets dir will be served - useful to restrict access e.g. serve from /assets dir
    content is now served from /assets (public/assets)
    */
    // publicPath: '/assets/',
    filename: "index.[name].[chunkhash].js" // use caching
  },
  devtool: !isProduction ? "inline-source-map" : null,
  eslint: {
    configFile: './.eslintrc'
  },
  devServer: {
    // needs contentBase to tell webpack where the content is served
    contentBase: path.join(__dirname, 'public/'),
    inline: true,
    stats: 'minimal',
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|vendors)/,
        loader: 'babel', // preprocess files - tasks -- loaders are right associatives
        query: {
          presets: ['react', 'es2015']   // extra params to be passed to the loader when transformations are applied to the code - not using .babelrc as es2015-webpack is used for tree shaking
        }
      },
      { test: /\.js$/, loader: "eslint-loader?config=eslint", exclude: [/node_modules/, /vendors/, /bower_components/] },
      {
        test: /\.(sass|scss)$/,
        loaders: [
          "style-loader", // passing query parameter using ? instead of the object
          "css-loader?sourceMap",
          "sass-loader?sourceMap"
        ],
        exclude: [/vendors/, /bower_components/]
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  plugins: isProduction  ? [] : [   // current val is development, run plugins when build
    new sassLintPlugin({
     configFile: './.sass-lint.yml',
     context: ['inherits from webpack'],
     ignoreFiles: [],
     ignorePlugins: [],
     glob: '**/*.s?(a|c)ss',
     quiet: false,
     failOnWarning: false,
     failOnError: false,
     testing: false
   }),
     // creates html file on the fly
   new HtmlWebpackPlugin({
     template: './index.html',
     title: 'App title',
     filename: 'index.html',
    //  inject:'',
    //  favicon: '',
     minify: false,
     js: [ 'index.js' ],
     chunks: {
       'head': {
         'css': 'main.css'
       },
       'main': {
         'entry': 'index.js'
       }
     }
   }),
    isProduction ? undefined : new webpack.optimize.DedupePlugin(),
    isTest ? undefined : new webpack.optimize.OccurenceOrderPlugin(),
    // isTest ? undefined : new webpack.optimize.CommonsChunkPlugin({
    //     // used to create separate chunks of js to be transpiled - used for vendors (bower_components)
    // }),
    new ExtractTextPlugin("styles.css"),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.DefinePlugin({ VERSION: JSON.stringify(packageJson.version) }),
  ].filter(p => !!p) // undefined is not a valid plugin so we filter and coerc it by a bool value - e.g. var myBool = !!"false" // == true
}
