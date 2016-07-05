const path = require('path');


module.exports = env => {
  return {
      entry: "./Main.js",
      output: {
        path: path.join(__dirname, 'public'),
        // reference for web browser
        publicPath: '/assets/'
        filename: "index.js",
        pathinfo: !env.prod,
      },

      // base dir for resolving entry option
      context: path.resolve(__dirname, 'src'),
      devtool: env.prod ? 'source-map' : 'eval',
      bail: env.prod,
      devServer: {
        inline: true,
        port: 3333
      },
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    }
  }
}
