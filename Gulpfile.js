"use strict";
var fs = require("fs");
var path = require("path");
var url = require("url");
var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var del = require("del");
var mkdirp = require("mkdirp");
var source = require("vinyl-source-stream");
var sass = require("gulp-sass");
var react = require("gulp-react");
var jshint = require("gulp-jshint");
var jsxcs = require("gulp-jsxcs");
var lab = require("gulp-lab");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
 
var paths = {
  css: ["src/css/**/*.scss"],
  js: ["src/js/**/*.jsx"],
  index: "index.html",
  entrypoint: ["./src/js/app.jsx"],
  build: "./build"
};

gulp.task("serve", ["watch", "css", "js", "copy"], function() {
  browserSync({
    files: [],
    port: 8080,
    server: {
      baseDir: paths.build,
      middleware: function(req, res, next) {
        var fileName = url.parse(req.url);
        fileName = fileName.href.split(fileName.search).join("");
        var fileExists = fs.existsSync(path.resolve(__dirname, paths.build) + fileName);
        if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
          req.url = "/index.html";
        }
        return next();
      }
    }
  });
});

gulp.task("test", function() {
  gulp.src("test")
    .pipe(lab());
});

gulp.task("jscs", function() {
  gulp.src(paths.js)
    .pipe(jsxcs());
});
 
gulp.task("lint", function() {
  gulp.src(paths.js)
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter("fail"));
});

gulp.task("clean-css", function(done) {
  del([paths.build + "/css/*"], done);
  mkdirp(paths.build + "/css");
});
 
gulp.task("css", ["clean-css"], function() {
  return gulp.src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest(paths.build + "/css"))
    .pipe(reload({stream:true}));
});
 
gulp.task("clean-js", function(done) {
  del([paths.build + "/js/*"], done);
  mkdirp(paths.build + "/js");
});
 
gulp.task("js", ["clean-js"], function() {
  browserify(paths.entrypoint)
    .transform(reactify)
    .bundle()
    .pipe(source("js/bundle.js"))
    .pipe(gulp.dest(paths.build))
    .pipe(reload({stream:true}));
});

gulp.task("clean-copy", function(done) {
  del([paths.build + "/" + paths.index], done);
});
 
gulp.task("copy", ["clean-copy"], function () {
  gulp.src(paths.index)
    .pipe(gulp.dest(paths.build))
    .pipe(reload({stream:true}));
});
 
gulp.task("watch", function() {
  gulp.watch(paths.css, ["css"]);
  gulp.watch(paths.js, ["js"]);
  gulp.watch(paths.index, ["copy"]);
});

gulp.task("build", ["jscs", "lint", "css", "js", "copy"]);
 
gulp.task("default", ["watch", "css", "js", "copy"]);
