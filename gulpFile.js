const { src, dest, parallel, watch } = require("gulp");
const ts = require("gulp-typescript");
const webpack = require("webpack-stream");
const plumber = require("gulp-plumber");
const uglify = require("gulp-uglify-es").default;

const tsProject = ts.createProject("./tsconfig.json");
const paths = {
  ts: {
    from: "./src/ts/**/*",
    to: "./src/js/"
  },
  js: {
    from: "./src/js/**/*",
    to: "./dist/js/",
  },
  build: {
    from: "./src/js/lizardt.js",
    to: "../build/js/"
  },
}

const buildLibrary = () => {
  return src(paths.build.from)
    .pipe(webpack({
      mode: "production",
      output: {
        filename: "lizardt.js",
        library: "lizardt",
        libraryTarget: "umd"
      }
    }))
    .pipe(uglify())
    .pipe(dest(paths.build.to));
}

const typescript = () => {
  const tsResult = src(paths.ts.from)
    .pipe(plumber())
    .pipe(tsProject());

  return tsResult.js
    .pipe(dest(paths.ts.to));
}

const js = () => {
  return src(paths.js.from)
    .pipe(plumber())
    .pipe(webpack({ mode: "development" }))
    .pipe(uglify())
    .pipe(dest(paths.js.to));
}

const watching = () => {
  watch(paths.ts.from, parallel(typescript));
  watch(paths.js.from, parallel(js));
}

const buildFunc = () => parallel(typescript, js);
const defaultFunc = () => parallel(buildFunc(), watching);
const funcBuildLibrary = () => parallel(buildLibrary);

exports.build = buildFunc();
exports.default = defaultFunc();
exports.buildLibrary = funcBuildLibrary();