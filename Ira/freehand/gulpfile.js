const gulp = require('gulp'),
  sass = require('gulp-sass'),
  browsersync = require('browser-sync').create();

function gulpSass() {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
}

function serve(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    notify: false
  }, done);
}

function reload(done) {
  browsersync.reload();
  done();
}

const compile = gulp
  .series(
    gulpSass,
    serve,
  );

function watchFiles() {
  gulp.watch('./scss/**/*.scss', gulp.series(gulpSass, reload));
  gulp.watch('./*.html', gulp.series(reload));
  gulp.watch('*.js', gulp.series(reload));
}

exports.watch = gulp.series(compile, watchFiles);
