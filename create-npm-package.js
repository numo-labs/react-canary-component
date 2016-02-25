var fs = require('fs-extra');
var pkg = require('./package.json');

var dest = __dirname + '/' + (pkg.npm_package.dest || 'npm_package/');

fs.removeSync(dest);

/**
 * Go through all the files/folders listed in npm_publish.files
 * inside package.json and copy them to npm_publish.
 */
pkg.npm_package.files.forEach(function (path) {
  if (fs.statSync(__dirname + '/' + path).isFile()) {
    fs.copySync(__dirname + '/' + path, dest + path);
  } else {
    fs.copySync(__dirname + '/' + path, dest);
  }
});

/**
 * Remove the devDependencies and npm_publish from pkg object
 * and write a new package.json.
 */
pkg.name = 'isearch-' + pkg.name;
delete pkg.devDependencies;
delete pkg.npm_package;
fs.writeJsonSync(dest + 'package.json', pkg);
