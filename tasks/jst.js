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
    });

    this.files.forEach(function(fm) {
      var dest = fm.dest;
      var jst  = {};

      fm.src.forEach(function(filepath) {
        var ext = path.extname(filepath);
        var key = path.basename(filepath, ext);

        var html = grunt.file.read(filepath);

        html = minify(html, {
          collapseWhitespace: true,
          keepClosingSlash:   true,
          removeComments:     true
        });

        jst[key] = html;
      });

      jst = JSON.stringify(jst);
      jst = 'var JST = ' + jst + ';';

      grunt.file.write(dest, jst);

      grunt.log.ok('Created: ' + dest);
    });
  });

};
