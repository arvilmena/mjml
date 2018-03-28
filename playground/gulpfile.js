var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var path = require('path');
var gutil = require('gulp-util');
var exec = require('child_process').exec;

const src = "./src/index.mjml"
const dest = "./src/output/"

// use default task to launch Browsersync and watch JS files
gulp.task('default', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./src/output/"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("./src/*.mjml", compileTemplates);
    gulp.watch("./src/output/*.html", browserSync.reload());
});

function compileTemplates(done) {
  // var cmd = `'node_modules/.bin/mjml' 'src/index.mjml'`
  var cmd = `cross-env ${path.resolve("./../packages/mjml/bin/mjml")} ${path.resolve(src)} --output ${path.resolve(dest)}`
  console.log("Executing: ", cmd);
  return  exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      done();
    });
}

exports.compile = compileTemplates;