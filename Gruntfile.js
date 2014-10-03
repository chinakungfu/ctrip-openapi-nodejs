'use strict';

// Gruntfile.js
module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  grunt.initConfig({
    watch: {
      js: {
        files: ['Gruntfile.js', 'index.js'],
        tasks: ['jshint']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'index.js'
        ]
      }
    }

  });

  grunt.registerTask('default', []);
};