// dev mode from NODE
const debug = process.env.NODE_ENV !== "production"

const path = require('path')
const sassLintPlugin = require('sasslint-webpack-plugin')
const packageJson = require('./package.json')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
// console.log(path.resolve(__dirname, ".eslintrc"))
// console.log([path.resolve(__dirname, "./src", "/sass/")]) // returns /sass
// // converts sass to css
// const css1 = require("!raw!sass-loader!./src/sass/main.sass")
// console.log(css1)
// console.log(css1)
// //chain style loader
// const css = require("!style-loader!css!sass-loader!./src/sass/main.sass");
// console.log(css)
// // returns compiled css code from file.scss, resolves Sass imports
//const css = require("!css!sass!./src/sass/main.sass");
// returns compiled css code from file.scss, resolves Sass and CSS imports and url(...)s

module.exports = {
  // base dir for resolving entry option - src/ will be root dir
  context: path.join(__dirname, 'src'),
  entry: {
    //format path to be ./app/App.js as input file
    app: path.format({
      dir: './app',
      base: 'App.js'
    })
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
    filename: "index.js"
  },
  devtool: debug ? "inline-source-map" : null,
  eslint: {
    configFile: './.eslintrc'
    // configFile: path.resolve(__dirname, ".eslintrc")
  },
  // sassloader: {
  //   includePaths: [path.resolve(__dirname, "./node_modules/bootstrap-sass/assets/stylesheets/")],
  // //   // data: "$env: " + process.env.NODE_ENV + ";"
  // },
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
        // preprocess files - tasks -- loaders are right associatives
        loader: 'babel',
        // extra params to be passed to the loader when transformations are applied to the code
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /\.js$/, loader: "eslint-loader?config=eslint", exclude: [/node_modules/, /vendors/, /bower_components/] },
      {
        test: /\.(sass|scss)$/,
        // passing query parameter using ? instead of the object
        loaders: [
          "style-loader",
          "css-loader?sourceMap",
          "sass-loader?sourceMap?config=sassloader"
        ],
        exclude: [/vendors/, /bower_components/]
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  // production, run plugins
  plugins: [
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
   new HtmlWebpackPlugin({
         filename: 'index.html',
         js: [ 'index.js' ],
         chunks: {
                 'main': {
                   'entry': 'index.js'
                 },
               }
      }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("styles.css"),
    //new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    //new webpack.DefinePlugin({ VERSION: JSON.stringify(packageJson.version) }),
  ]
}
