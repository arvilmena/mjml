var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var path = require('path');
var gutil = require('gulp-util');
var exec = require('child_process').exec;
var log = require('fancy-log');
var colors = require('ansi-colors');

const src = "./src/index.mjml"
const destProd = "./src/output/index-minified.html"
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
    gulp.watch("./src/output/*.html", function(done) {
        colors.bold(colors.cyan('[info]')), colors.cyan("> Reloading browser because of changes in output folder")
        browserSync.reload()
        done()
    });
});

function compileTemplates(done) {
  // var cmd = `'node_modules/.bin/mjml' 'src/index.mjml'`
  var cmd = `cross-env ${path.resolve("./../packages/mjml/bin/mjml")} ${path.resolve(src)} --config.beautify --output ${path.resolve(dest)}`
  log(
        colors.bold(colors.cyan('[info]')), colors.cyan("> Executing: \n"+ cmd)
    );
  browserSync.notify("Compiling, please wait!");
  exec(cmd, (error, stdout, stderr) => {
      if (error) {
      log(
            colors.bold(colors.red('[ERROR]')), colors.red('> compileTemplates failed!')
        );
        done()
      }
      // console.log(`stdout: ${stdout}`);
      // console.log(`stderr: ${stderr}`);
      log(
            colors.bold(colors.yellow('[stdout]')), colors.yellow(`> ${stdout}`)
        );
      log(
            colors.bold(colors.yellow('[stderr]')), colors.yellow(`> ${stderr}`)
        );
      log(
            colors.bold(colors.green('[success]')), colors.green('> compileTemplates success!')
        );
      done();
    });
}

function compileTemplatesProd(done) {
  // var cmd = `'node_modules/.bin/mjml' 'src/index.mjml'`
  var cmd = `cross-env ${path.resolve("./../packages/mjml/bin/mjml")} ${path.resolve(src)} --config.minify --output ${path.resolve(destProd)}`
  log(
        colors.bold(colors.cyan('[info]')), colors.cyan("> Executing: \n"+ cmd)
    );
  browserSync.notify("Compiling, please wait!");
  exec(cmd, (error, stdout, stderr) => {
      if (error) {
      log(
            colors.bold(colors.red('[ERROR]')), colors.red('> compileTemplates failed!')
        );
        done()
      }
      // console.log(`stdout: ${stdout}`);
      // console.log(`stderr: ${stderr}`);
      log(
            colors.bold(colors.yellow('[stdout]')), colors.yellow(`> ${stdout}`)
        );
      log(
            colors.bold(colors.yellow('[stderr]')), colors.yellow(`> ${stderr}`)
        );
      log(
            colors.bold(colors.green('[success]')), colors.green('> compileTemplates success!')
        );
      done();
    });
}

exports.compile = compileTemplates;
exports.dist = compileTemplatesProd;