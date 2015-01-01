'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default', function(){

  browserSync({
    server: {
      baseDir: "./"
    },
    open: true
  });


});