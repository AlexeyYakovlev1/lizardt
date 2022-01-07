const { src, dest, parallel, watch } = require('gulp');
const ts = require('gulp-typescript');
const webpack = require('webpack-stream');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const tsProject = ts.createProject('./tsconfig.json');
const buildFolder = 'build';
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
    from: './dist/js/*.js',
    to: `../${buildFolder}/js/`
  }
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

const buildLibrary = () => {
  return src(paths.build.from)
    .pipe(plumber())
    .pipe(webpack({
      mode: 'production',
      output: {
        library: 'main'
      }
    }))
    .pipe(concat('main.js'))
    .pipe(dest(paths.build.to));
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
exports.buildLibrary = parallel(buildLibrary);