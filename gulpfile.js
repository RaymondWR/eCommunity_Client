'use strict';

//Setup
var config = require('./config/config.js'); //Load Config Variables
var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); //load plugins
var templateCache = require('gulp-angular-templatecache'); //Won't load using gulp-load-plugins
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;


//Process Settings
var Settings = {
  'NODE_ENV': config.get('env'),
  'MOBILE': config.get('mobile'),
  'API': config.get('api'),
  'MINIFY': { empty: true, cdata: true, spare: true, quotes: true }
};

if(Settings.NODE_ENV === "development"){
  Settings.SERVEFROM = ['./.tmp', './app']
} else{
  Settings.SERVEFROM = ['./dist/']
};

// Lint JS
gulp.task('jshint', function () {
  return gulp.src(['./app/scripts/**/*.js', '!./app/scripts/lib/**/*.js', '!./app/scripts/templates.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// Test App Speed Using Pagespeed Insights
gulp.task('pagespeed', pagespeed.bind(null, {
  url: 'https://example.com',
  strategy: 'mobile'
}));


/**
  ** Optimizations
**/

//Optimize Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(config.get('build_destination')+'images'))
    .pipe($.size({title: 'images'}));
});

//Process SASS to CSS
gulp.task('styles', function () {
  return gulp.src('app/styles/app.scss')
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['app/styles']
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});


//Copy Fiels To Destinations Folder
gulp.task('fonts', function () {
  return gulp.src(['app/fonts/*.eot', 'app/fonts/*.svg', 'app/fonts/*.ttf', 'app/fonts/*.woff'])
    .pipe(gulp.dest(config.get('build_destination')+'fonts'))
    .pipe($.size({title: 'fonts'}));
});

gulp.task('copyCommon', function(){
  gulp.src('app/assets/**/')
    .pipe(gulp.dest(config.get('build_destination')+'assets'))
  return gulp.src('app/scripts/**/*.tpl.html')
    .pipe(gulp.dest(config.get('build_destination')+'scripts'));
});

gulp.task('copyMobileSpecific', function(){
  gulp.src(['app/manifest.json', 'app/manifest.mobile.json', 'app/background.js'])
    .pipe(gulp.dest(config.get('build_destination')))
  return gulp.src('app/res/**/')
    .pipe(gulp.dest(config.get('build_destination')+'res'));
});

//Angular Template Cache
// gulp.task('templateCache', function () {
//   return gulp.src('app/**/*.tpl.html')
//     .pipe(templateCache('templates.js', { module:'communityApp.templates', standalone:true }))
//     .pipe(gulp.dest('app/scripts'));
// });

//Preprocess Files to remove conditional elements
gulp.task('preprocessDev', function(){
  return gulp.src('app/*.html')
    .pipe($.preprocess({ context: Settings }))
    .pipe(gulp.dest('.tmp/'))
    .pipe($.size());
});

gulp.task('preprocessJS', function(){
  return gulp.src('app/scripts/app.js')
    .pipe($.preprocess({ context: Settings }))
    .pipe(gulp.dest('.tmp/scripts/'))
    .pipe($.size());
});

gulp.task('preprocessMobileJS', function(){
  return gulp.src('app/scripts/app.js')
    .pipe($.preprocess({ context: Settings }))
    .pipe(gulp.dest(config.get('build_destination')+'scripts/'))
    .pipe($.size());
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});
  var jsFilter = $.filter("**/*.js");
  var cssFilter = $.filter("**/*.css");
  return gulp.src('app/*.html')
    .pipe(assets)
    // Concatenate And Minify JavaScript
    .pipe(jsFilter)
    .pipe($.preprocess({ context: Settings }))
    //.pipe($.ngAnnotate())
    //.pipe($.uglify())
    .pipe(jsFilter.restore())
    // Concatenate And Minify Styles
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    // Preprocess HTML
    .pipe($.if('*.html', $.preprocess({ context: Settings })))
    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml()))
    // Output Files
    .pipe(gulp.dest(config.get('build_destination')))
    .pipe($.size({title: 'html'}));
});


//Watch Files For Changes & Reload with public ip using browserSync.io
gulp.task('serve', function(){
  browserSync.init(null, {
    port: 3001,
    server: {
      baseDir: Settings.SERVEFROM
    },
    notify: false
  });
  gulp.watch(['app/**/*.html'], ['preprocessDev'], reload);
  gulp.watch(['app/scripts/app.js'], ['preprocessJS'], reload);
  gulp.watch(['.tmp/**/*.html'], reload);
  gulp.watch(['app/**/*.tpl.html'], reload);
  gulp.watch(['app/styles/**/*.{css,scss}'], ['styles']);
  gulp.watch(['.tmp/styles/**/*.css'], reload);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], ['images'], reload);
});


/**
  ** TASKS TO CALL
**/

//Development Livereload and Server
gulp.task('develop', function(cb) {
  runSequence(['clean'], ['styles'], ['preprocessDev', 'preprocessJS'],['serve'], cb);
});

//Clean folders
gulp.task('cleantmp', function(cb){
  return del('./.tmp', {force: true }, cb);
});

gulp.task('cleandist', function(cb){
  return del('./dist', {force: true }, cb);
});

gulp.task('cleancordova', function(cb){
  return del('./cordova/www', {force: true }, cb);
});

gulp.task('clean', ['cleantmp', 'cleandist', 'cleancordova']);


// Build Production Files
gulp.task('web', function (cb) {
  runSequence(['clean'], ['styles'], ['jshint', 'copyCommon', 'fonts', 'images'], ['html'], cb);
});


//Build Cordova(Mobile) Apps
gulp.task('mobile', function (cb) {
  runSequence(['clean'], ['styles'], ['jshint', 'copyMobileSpecific', 'copyCommon', 'fonts', 'images'], ['html', 'preprocessMobileJS'], cb);
});

//Build Desktop Apps
gulp.task('builddesktop', []);

/**
  ** TODO PLACEHOLDER - Platform Specific Builds
**/

//Mobile Builds

//iOS
gulp.task('buildios', []);

//Android
gulp.task('buildandroid', []);

//WindowsPhone
gulp.task('buildwindowsphone', []);


//Build Desktop Apps
/**
  **Todo Add Support for Desktop Environments
**/

//Build OSX
gulp.task('buildosx', []);

//Build Windows
gulp.task('buildwindows', []);

/**
  ** END TASKS TO CALL
**/