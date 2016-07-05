const path = require('path');

module.exports = {
  // base dir for resolving entry option
  context: path.join(__dirname, 'src'),
  entry: "./Main",
  output: {
    path: path.join(__dirname, 'public/assets'),
    /* reference for web browser - is needed to specify the path -
    Will be using path as base and then add assets to match ./public/assets
    - --content-base public/ needs to passed as a flag
    */

    // assets is served
    publicPath: '/assets/',
    filename: "index.js"
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    stats: 'minimal',
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
        // {
        //   test: /\.s+(c)ass$/
        // }
      }
    ]
  }
}
