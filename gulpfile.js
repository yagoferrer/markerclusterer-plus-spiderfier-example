var gulp = require('gulp');
var http = require('http');
var ecstatic = require('ecstatic');

gulp.task('default', function(){
  http.createServer(
    ecstatic({ root: __dirname })
  ).listen(8080);

});