const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const del = require('del');
const zip = require('gulp-zip');

const nodeModulesForBuild = [
    './node_modules/babel-polyfill/**/*'
]

gulp.task('default', ['cleanBuild'], function () {
    gulp.start('indexHtml', 'scripts', 'libs', 'bowerComp', 'nodeModules', 'imagemin');
});

gulp.task('cleanBuild',function() {
    return del(['build']);
})

gulp.task('indexHtml', function () {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./build'));
})

gulp.task('libs', function () {
    return gulp.src('./libs/**')
        .pipe(gulp.dest('./build/libs'));
});

gulp.task('scripts', function () {
    return gulp.src('./dist/**/*')
        .pipe(gulp.dest('./build/dist'));
});

gulp.task('bowerComp', function () {
    return gulp.src('./bower_components/**/*')
        .pipe(gulp.dest('./build/bower_components'));
})

gulp.task('nodeModules', function () {
    for (var nodeModule of nodeModulesForBuild) {
        gulp.src(nodeModule)
            .pipe(gulp.dest('./build/node_modules/' +
                nodeModule.substring(nodeModule.indexOf('s/') + 2, nodeModule.indexOf('/**'))));
    }
});

gulp.task('zip', function(){
    var zipString = 'build ' + new Date().toLocaleString().replace(":","-").replace(":","-") + '.zip';
    return gulp.src('./build/**')
                .pipe(zip(zipString))
                .pipe(gulp.dest("./build"));
})

gulp.task('imagemin', function () {
    var imgSrc = './assets/**/*',
        imgDst = './build/assets';

    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});
