import gulp from 'gulp'

const

  // Package dependencies.
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  concat = require('gulp-concat'),
  defineModule = require('gulp-define-module'),
  handlebars = require('gulp-handlebars'),
  handlebarsEngine = require('handlebars'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),

  // Package configurations.
  uglifyConfig = {
    output: {
      comments: 'some',
    },
  },
  sassConfig = {
    outputStyle: 'expanded',
    indentWidth: 2,
  },

  // Task configuration.
  templateConfig = {
    src: './templates_src/client_side/**/*.handlebars',
    concat: 'templates.js',
    dest: './templates_compiled/client_side',
  },
  scriptConfig = {
    src: './js/source/**/*.js',
    concat: 'scripts.js',
    dest: './js/compiled',
  },
  styleConfig = {
    src: './scss/*.scss',
    concat: 'chat.css',
    dest: '.',
  }

  ;

/**
 * Wraps a handlebars template with a function and attach it to the
 * Handlebars.templates object.
 *
 * @returns {Function} A function that can be used in pipe() method of a file
 *   stream right after gulp-handlebars plugin.
 */
const wrapHandlebarsTemplate = () => {
  return defineModule('plain', {
    wrapper: '(function() {\n'
      + 'var templates = Handlebars.templates = Handlebars.templates || {};\n'
      + 'Handlebars.templates["<%= relative %>"] = <%= handlebars %>;\n'
      + '})()',
    context: function(context) {
      return {relative: context.file.relative.replace(/\.js$/, '').replace(/\\/g, '/')};
    }
  });
};

const compileTemplate = () =>  {
  return gulp.src(templateConfig.src)
    .pipe(handlebars({handlebars: handlebarsEngine}))
    .pipe(wrapHandlebarsTemplate())
    .pipe(concat(templateConfig.concat))
    .pipe(uglify(uglifyConfig))
    .pipe(gulp.dest(templateConfig.dest));
};

const compileScript = () => {
  return gulp.src(scriptConfig.src)
    .pipe(concat(scriptConfig.concat))
    .pipe(uglify(uglifyConfig))
    .pipe(gulp.dest(scriptConfig.dest));
};

const compileStyle = () => {
  return gulp.src(styleConfig.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig))
    .pipe(postcss([
      autoprefixer(),
      //cssnano()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(styleConfig.dest));
};

const watchTemplate = (done) => {
  gulp.watch(templateConfig.src, compileTemplate);
  done();
};

const watchScript = (done) => {
  gulp.watch(scriptConfig.src, compileScript);
  done();
}

const watchStyle = (done) => {
  gulp.watch(styleConfig.src, compileStyle);
  done();
}

const compile = gulp.parallel(compileTemplate, compileScript, compileStyle)
compile.description = 'compile all source files'

const watch = gulp.parallel(watchTemplate, watchScript, watchStyle)
watch.description = 'watch for changes to all source'

const defaultTasks = gulp.parallel(watch)

export {
  compile,
  compileTemplate,
  compileScript,
  compileStyle,
  watch,
  watchTemplate,
  watchScript,
  watchStyle,
}

export default defaultTasks
