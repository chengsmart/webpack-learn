let gulp = require("gulp");
let uglify = require('gulp-uglify-es').default;

gulp.task("default", function () {
  return gulp.src('webpack/*.js')
    .pipe(uglify( /* options */ ))
    .pipe(gulp.dest('lib/'))
});