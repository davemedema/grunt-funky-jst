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
      global: 'JST',
      root:   'app'
    });

    this.files.forEach(function(fm) {
      var dest       = fm.dest;
      var jst        = {};
      var output     = '';
      var outputPath = path.resolve(__dirname + '/../tasks/templates/output-template.js');

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

      output = grunt.file.read(outputPath);
      output = output.replace('{{global}}', opts.global);
      output = output.replace('{{jst}}', jst);

      grunt.file.write(dest, output);

      grunt.log.ok('Created: ' + dest);
    });
  });

};
