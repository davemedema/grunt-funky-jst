'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    // pkg
    pkg: grunt.file.readJSON('package.json'),

    // clean
    // ---
    clean: {
      release: [
        'npm-debug.log'
      ],
      test: [
        'tmp/*'
      ]
    },

    // jshint
    // ---
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.files %>'
      ]
    },

    // jst
    // ---
    jst: {
      test: {
        options: {
          root: 'fixtures'
        },
        src: ['test/fixtures/**/*.html'],
        dest: 'tmp/templates.js'
      }
    },

    // nodeunit
    // ---
    nodeunit: {
      files: ['test/**/*_test.js']
    }
  });

  // Load
  // ---------------------------------------------------------------------------

  grunt.loadTasks('tasks');

  require('load-grunt-tasks')(grunt);

  // Aliases
  // ---------------------------------------------------------------------------

  // `grunt`
  // ---
  grunt.registerTask('default', ['test']);

  // `release`
  // ---
  grunt.registerTask('release', function(type) {
    grunt.task.run('test');
    grunt.task.run('bump:' + (type || 'patch'));
    grunt.task.run('tag');
  });

  // `test`
  // ---
  grunt.registerTask('test', [
    'clean:test',
    'jshint',
    'jst:test',
    'nodeunit'
  ]);

};
