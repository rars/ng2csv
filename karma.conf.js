var path = require('path');

//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      'test/Test.ts'
    ],

    preprocessors: {
      'test/Test.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      // karma watches the test entry points
      // webpack watches dependencies
      devtool: 'inline-source-map',
      resolve: {
        root: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'test')
        ],
        extensions: ['.ts']
      },
      module: {
        loaders: [
          {
            test: /\.ts(x?)$/,
            loader: 'ts-loader'
          }
        ]
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-jasmine',
      'karma-jasmine-html-reporter'
    ],

    reporters: [
      'dots',
      'kjhtml'
    ],

    //port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    captureTimeout: 60000,

    autoWatch: true,
    singleRun: false
  });
};
