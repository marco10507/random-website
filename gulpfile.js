const {gulp, series, parallel, src, dest, watch} = require("gulp");
const uglifycss = require('gulp-uglifycss');

const resetCssPath = "node_modules/modern-css-reset/dist/reset.min.css";
const cssPath = "./assets/css/*.css";

function copyResetCssTask(done){
  src([resetCssPath])
          .pipe(dest("public/css/vendors/reset-css"));
  done();
}

function cssTask(done){
  src([cssPath])
          .pipe(uglifycss({"uglyComments": true}))
          .pipe(dest("public/css/"));
  done();
}

function watchTask(){
  watch([resetCssPath, cssPath],{}, parallel(copyResetCssTask, cssTask));
}

exports.default = series(
  parallel(copyResetCssTask, cssTask),
  watchTask,
);
