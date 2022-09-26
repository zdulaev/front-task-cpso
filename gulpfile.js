// Импорт пакетов
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const babel = require('gulp-babel')
const include = require('gulp-include')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const browsersync = require('browser-sync').create()
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const del = require('del')

// Пути исходных файлов src и пути к результирующим файлам dest
const paths = {
    html: {
        src: ['src/*.html', 'src/*.pug'],
        dest: 'dist/',
        watch: ['src/**/*.html', 'src/**/*.pug']
    },
    styles: {
        src: ['src/styles/main.scss'],
        dest: 'dist/css/',
        watch: ['src/styles/*']
    },
    scripts: {
        src: ['src/scripts/main.js'],
        dest: 'dist/js/',
        watch: ['src/scripts/*']
    }
}

// Очистить каталог dist, удалить все кроме изображений
function clean() {
    return del(['dist/*'])
}

// Обработка html и pug
function html() {
    return gulp.src(paths.html.src)
        .pipe(include(
            {
                'hardFail': true
            }
        )).on('error', console.log)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browsersync.stream())
}

// Обработка препроцессоров стилей
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browsersync.stream())
}

// Обработка Java Script, Type Script и Coffee Script
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(include(
            {
                'hardFail': true
            }
        )).on('error', console.log)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            basename: 'script',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browsersync.stream())
}

// Отслеживание изменений в файлах и запуск лайв сервера
function watch() {
    browsersync.init({
        server: {
            baseDir: "./dist"
        }
    })
    // gulp.watch(paths.html.watch).on('change', browsersync.reload)
    gulp.watch(paths.html.watch, html).on('change', browsersync.reload)
    gulp.watch(paths.styles.watch, styles).on('change', browsersync.reload)
    gulp.watch(paths.scripts.watch, scripts).on('change', browsersync.reload)
}

// Таски для ручного запуска с помощью gulp clean, gulp html и т.д.
exports.clean = clean

exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.watch = watch

// Таск, который выполняется по команде gulp
exports.default = gulp.series(clean, html, gulp.parallel(styles, scripts), watch)
