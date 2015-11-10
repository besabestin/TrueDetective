'use strict';

module.exports = {

  'browserport'  : 3000,
  'uiport'       : 3001,
  'serverport'   : 3002,

  'styles': {
    'src' : 'app/styles/**/*.scss',
    'dest': 'build/css'
  },

  'scripts': {
    'src' : 'app/js/**/*.js',
    'dest': 'build/js'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'build/images'
  },

  'fonts': {
    'src' : ['app/fonts/**/*'],
    'dest': 'build/fonts'
  },

  'views': {
    'watch': [
      'app/index.html',
      'app/views/**/*.html'
    ],
    'src': 'app/views/**/*.html',
    'dest': 'app/js'
  },

  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'build/',
    'options': {}
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['./app/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  },

  'swagger': {
    'src' : [
      {
        'url': 'https://apis-guru.github.io/api-models/clickmeter.com/v2/',
        'filename': 'swagger.json',
        'moduleName': 'ClickMeter'
      },
      {
        'url': 'https://apis-guru.github.io/api-models/googleapis.com/gmail/v1/',
        'filename': 'swagger.json',
        'moduleName': 'Gmail'
      },
      {
        'url': 'http://localhost:8080/',
        'filename' : 'swagger.json',
        'moduleName': 'Dropwizard'
      }
    ],
    'dest' : 'app/js/apis/',
    'cleanGlob': 'app/js/apis/**/!(*_index|*Spec)*(.js|.json|.yaml)'
  }

};
