var webpack = require('karma-webpack');
var webpackConfig = require('./webpack.config.test');

// webpackConfig.module.loaders = [
//   {
//     test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
//     loader: 'babel-loader'
//   }
// ];
// webpackConfig.module.postLoaders = [{
//   test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
//   loader: 'istanbul-instrumenter'
// }];

// webpackConfig.resolve = {
//   alias: [
//     { _karma_webpack_: __dirname }
//   ]
// }

module.exports = function (config) {
  config.set({
    basePath: __dirname,
    frameworks: [
      // '' 
      'mocha',
      'chai'
    ],
    files: [
      // './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'src/app/**/*.js',
      'src/app/**/*.test.js',
      //   'src/test-context.js',

      // { pattern: 'test-context.js', watched: false }
    ],
    plugins: [
      webpack,
      // 'karma-jasmine',
      'karma-mocha',
      'karma-chrome-launcher',
      // 'karma-firefox-launcher',
      // 'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-chai'
    ],
    browsers: [ 
      // 'PhantomJS',
      'Chrome'
    ],
    preprocessors: {
      '../src/app/**/*.js': ['webpack', ],
      '../src/app/**/*.test.js': ['webpack', ]

      // '../src/test-context.js': ['webpack'],
    },
    reporters: [ 
      // 'spec', 
      'progress',
      'coverage' 
    ],
    coverageReporter: {
      // dir: 'build/reports/coverage',
      reporters: [ // reporter ?
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    webpack: webpackConfig,

    webpackMiddleware: { noInfo: true },
    concurrency: Infinity,
    singleRun: true,
    autoWatch: false,
    logLevel: config.LOG_INFO,
    colors: true,
    port: 9876,
  });
};