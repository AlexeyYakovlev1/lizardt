const { src, dest, parallel, watch } = require('gulp');
const ts = require('gulp-typescript');
const webpack = require('webpack-stream');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const tsProject = ts.createProject('./tsconfig.json');
const paths = {
  ts: {
    from: './src/ts/**/*',
    to: './src/js/'
  },
  js: {
    from: './src/js/**/*',
    to: './dist/js/',
  },
  html: {
    from: './src/*.html',
    to: './dist/'
  },
  build: {
    from: './src/js/Lizardx.js',
    to: '../build/js/'
  },
  readme: {
    from: './README.md',
    to: '../build/'
  }
}

const buildLibrary = () => {
  return src(paths.build.from)
    .pipe(webpack({
      output: {
        filename: 'Lizardx.js',
        library: 'Lizardx',
        libraryTarget: 'umd'
      }
    }))
    .pipe(dest(paths.build.to));
}

const readme = () => {
  return src(paths.readme.from)
    .pipe(dest(paths.readme.to));
}

const typescript = () => {
  const tsResult = src(paths.ts.from)
    .pipe(plumber())
    .pipe(tsProject());

  return tsResult
    .js
    .pipe(dest(paths.ts.to))
    .pipe(browserSync.stream());
}

const js = () => {
  return src(paths.js.from)
    .pipe(plumber())
    .pipe(webpack({
      mode: 'development',
    }))
    .pipe(dest(paths.js.to))
    .pipe(browserSync.stream());
}

const html = () => {
  return src(paths.html.from)
    .pipe(plumber())
    .pipe(dest(paths.html.to))
    .pipe(browserSync.stream());
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });
}

const watching = () => {
  watch(paths.ts.from, parallel(typescript));
  watch(paths.js.from, parallel(js));
  watch(paths.html.from, parallel(html));
}

const buildFunc = () => parallel(typescript, js, html);
const defaultFunc = () => parallel(buildFunc, watching, server);

exports.build = buildFunc();
exports.default = defaultFunc();
exports.buildLibrary = parallel(buildLibrary, readme);