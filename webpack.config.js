const path = require('path');
// const css = require("!raw!sass!./src/sass/main.sass");
// returns compiled css code from file.scss, resolves Sass imports

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
    path: path.join(__dirname, 'public/'),
    /* reference for web browser - is needed to specify the path -
    Will be using path as base and then add assets to match ./public/assets
    - --content-base public/ needs to passed as a flag
     assets dir will be served - useful to restrict access e.g. serve from /assets dir
    content is now served from /assets (public/assets)
    */
    publicPath: '/assets/',
    filename: "index.js"
  },
  devtool: 'source-map',
  // devtool: env.prod ? 'source-map' : 'eval',
  devServer: {
    inline: true,
    stats: 'minimal',
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules | bower_components)/,
        // preprocess files - tasks
        loader: 'babel',
        // extra params to be passed to the loader when transformations are applied to the code
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(css|scss)$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"],
        exclude: [/vendors/, /node_modules/, /bower_components/]
      }
    ]
  }
  // sassLoader: {
  //   includePaths: [path.join(__dirname, 'src', 'sass')]
  // }
}
