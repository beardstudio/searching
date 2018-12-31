//Déclarations des variables

var gulp = 			require('gulp');
// var open = require('gulp-open');
var sass = 			require('gulp-sass');
var sourcemaps        = require('gulp-sourcemaps'); //Gère le ciblage du partial auquel il est rattaché
var autoprefixer = 	require('gulp-autoprefixer');
var htmlmin = 		require('gulp-htmlmin');
var cleanCSS = 		require('gulp-clean-css');
var plumber = 		require('gulp-plumber'); // gère les erreurs lié au process de gulp
var notify = 		require("gulp-notify"); // gère les erreurs de sass
var browserSync =	require("browser-sync"); // Plus besoin de refresh 
var uglify = require("gulp-uglify"); //
var rename = require("gulp-rename"); //
// var fileinclude =   require('gulp-file-include');
var jshint =        require('gulp-jshint');

// Fonctionnalités

// gulp.task('app', function(){
//   var options = {
//     uri: 'localhost:3000',
//     app: 'firefox'
//   };
//   gulp.src(__filename)
//   .pipe(open(options));
// });

gulp.task('transformcss', function () {			//On donne un nom à la tâche
  return gulp.src('src/css/scss/**/*.scss')
    .pipe(sourcemaps.init()) //On initie le source map
    .pipe(plumber({errorHandler: notify.onError("Erreur: <%= error.message %>")}))
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(sourcemaps.write()) //On écrit le partial dans lequel le selecteur se trouve (voir inspecteur du browser)
    .pipe(gulp.dest('dist/css'));
});

gulp.task('uglification', function () {     //On donne un nom à la tâche
    return gulp.src('src/js/*.js')
      .pipe(plumber({errorHandler: notify.onError("Erreur: <%= error.message %>")}))
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'))
      .pipe(rename(function(path){
        path.basename += ".min";
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('minify', function() {
  return gulp.src('src/*.html')
    
    // .pipe(fileinclude({
    //   prefix: '@@',
    //   basepath: '@file'
    // }))

    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('sync', function() {
    browserSync.init({
        browser: "google chrome", // ouvrir automatiquement dans chrome
        server: {
            baseDir: "dist"
        }
    });
});

// Surveille et lance les tâches

gulp.task('watch', ['sync', 'minify', 'transformcss'], function () {
  gulp.watch('src/css/scss/**/*.scss', ['transformcss']); // Je surveille tous les fichiers scss pour les sassifier
  gulp.watch('src/js/*.js', ['uglification']);
  gulp.watch('src/*.html', ['minify']);
  gulp.watch("dist/*.html").on('change', browserSync.reload);
  gulp.watch("dist/css/*.css").on('change', browserSync.reload);
  gulp.watch('dist/js/*.js').on('change', browserSync.reload);
});

gulp.task('default',['watch']); //Je dis ce qu'il se passe lorsqu'on tape "Gulp"