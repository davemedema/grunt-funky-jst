/*
 * grunt-funky-jst
 * https://github.com/davemedema/grunt-funky-jst
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

var minify = require('html-minifier').minify;
var path   = require('path');

/**
 * Exports.
 *
 * @param {Object} grunt
 */
module.exports = function(grunt) {

  grunt.registerMultiTask('jst', function() {
    var opts = this.options({
      root: 'app'
    });

    this.files.forEach(function(fm) {
      var dest   = fm.dest;
      var jst    = {};
      var output = '';

      fm.src.forEach(function(filepath) {
        var html  = '';
        var key   = '';
        var split = filepath.split(opts.root);

        if (!split.length) return;

        key = split
          .pop()
          .replace(/^\//g, '')
          .replace('.html', '');

        html = grunt.file.read(filepath);

        html = minify(html, {
          collapseWhitespace: true,
          keepClosingSlash:   true,
          removeComments:     true
        });

        jst[key] = html;
      });

      jst = JSON.stringify(jst);

      output = grunt.file.read('lib/output-template.js');
      output = output.replace('{{jst}}', jst);

      grunt.file.write(dest, output);

      grunt.log.ok('Created: ' + dest);
    });
  });

};
