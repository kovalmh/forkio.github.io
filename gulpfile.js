const gulp = require("gulp"),
  sass = require("gulp-sass"),
  autoprefix = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  cleanCss = require("gulp-clean-css"),
  purgeCss = require("gulp-purgecss"),
  minifyJs = require("gulp-jsmin"),
  minifyImg = require("gulp-imagemin"),
  rename = require("gulp-rename"),
  clean = require("gulp-clean");
browserSync = require("browser-sync").create();

let styleOperations = () => {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(autoprefix())
    .pipe(cleanCss())
    .pipe(
      purgeCss({
        content: ["./*.html"],
        css: ["./src/scss/*.css"],
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
};

let jsOperations = () => {
  return gulp
    .src("./src/js/*")
    .pipe(concat("script.js"))
    .pipe(minifyJs())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
};

let imagesOperations = () => {
  return gulp
    .src("./src/img/*")
    .pipe(minifyImg())
    .pipe(gulp.dest("./dist/img"))
    .pipe(browserSync.stream());
};

let clear = () => {
  return gulp.src("./dist").pipe(clean());
};

let brSync = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    notify: false,
  });

  gulp.watch("./*.html").on("change", browserSync.reload);
};

let watcher = () => {
  gulp.watch("./src/scss/*", styleOperations);
  gulp.watch("./src/js/*", jsOperations);
  gulp.watch("./src/img", imagesOperations);
};

gulp.task(
  "build",
  gulp.series(clear, styleOperations, jsOperations, imagesOperations)
);

gulp.task(
  "dev",
  gulp.series(
    styleOperations,
    jsOperations,
    imagesOperations,
    gulp.parallel(watcher, brSync)
  )
);

gulp.task("default", gulp.series("build", "dev"));
