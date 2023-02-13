const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const webp = require("gulp-webp");
const plumber = require("gulp-plumber");

const paths = {
  scss: "src/scss/**/*.scss",
  imagenes: "src/img/**/*",
};

function css(done) {
  src(paths.scss) // identificar el arhivo SASS
    .pipe(plumber())
    .pipe(sass()) // Compilarlo
    .pipe(dest("build/css")); // Almacenar

  done(); // Callback que avisa a gulp cuando llegamos al final
}

function versionWebp() {
  return src(paths.imagenes).pipe(webp()).pipe(dest("build/img"));
}

function watchfiles() {
  watch(paths.scss, css);
  watch(paths.imagenes, versionWebp);
}

exports.css = css;
exports.watch = watchfiles;
exports.default = parallel(css, versionWebp, watchfiles);
