# react-canary-component

## How to Setup a React Webpack Babel Project
Boilerplate for setting up a repository with minimal dependencies as a  across all projects.

## Basic
Initialize your project by running the `$ npm init` command in the terminal.  

Basic file structure:
```
.
├── package.json
├── README.md
├── src
│   ├── app.js
│   ├── component
│   │   ├── assets
│   │   │   ├── img (folder for all the images)
│   │   │   └── style.css
│   │   └── index.js
│   └── index.html
├── test
│   └── component
│       └── index.test.js
└── webpack.config.js

```


The basic setup required to build your initial bundle involves installing the following dependencies. Run this command in your command line:

`$ npm i --save-dev webpack babel-core babel-loader babel-preset-react babel-preset-es2015 react react-dom file-loader`

Create a `webpack.config.js` file and include the following within it:

```js
module.exports = {
  entry: {
    javascript: './src/app.js',
    html: './src/index.html'
  },

  output: {
    filename: 'app.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};
```

Create a `.babelrc` file and include the following within it:
```json
{
 "presets": ["es2015", "react"]
}
```

Then we have to add a 'build' script to our `package.json` that will create our bundle. It is written as follows:

```json
"build": "webpack --progress"
```

## Hot-loading
In order to enable hot-reloading of your project _(live updates in the browser)_ you'll need the following. Run this command in your terminal:

`$ npm i --save-dev webpack-dev-server react-hot-loader`

In your `webpack.config.js` file change your 'jsx' loader to the following:

```js
module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  }
```
**NOTE: The loader has changed to the plural 'loaders'**

We then need to add the following script to our `package.json` so that we can start our dev server:

```json
  "dev": "webpack-dev-server --hot --inline",
```
You can now visit your server by going to `http://localhost:8080/`

FYI: If you go to `http://localhost:8080/webpack-dev-server/#/` you can see hot-loading with errors.

## Linting
For linting we have chosen to use 'semistandard'. To install it run the following command in the command line:

`$ npm i --save-dev semistandard`

Now let's add a linting script to our `package.json` which is simply:

```json
"lint": "semistandard"
```


## Testing

To test our React components we are using Mocha. Run the following command in the terminal to install the testing framework:

`npm i --save-dev mocha jsdom react-addons-test-utils mocha-jsdom expect`

Include this script in your `package.json` to run your tests:

```json
"test": "npm run lint && mocha test/**/*.test.js --compilers js:babel-register"
```

You'll need to add the following to the `package.json` in order to exclude our test commands from the linter:

```json
"semistandard" :
  "globals": [
    "describe",
    "it"
  ]
```

## Code coverage
To have code coverage in our project you'll need the following. Run this command in your terminal:

`$ npm i --save-dev babel-cli babel-istanbul`

Add the coverage script to our `package.json` and modify the test script to trigger coverage instead:
```json
"test": "npm run lint && npm run coverage",
"coverage": "./node_modules/.bin/babel-node ./node_modules/.bin/babel-istanbul cover ./node_modules/.bin/_mocha index.test.js --report lcovonly -- -R spec"
```

You can also add a `nocov` script to test without the coverage:
```json
"nocov": "npm run lint && mocha index.test.js --compilers js:babel-register",
```

## Create a package to publish to NPM
In order to publish to NPM we need to construct a folder with all the files that we need.

install `npm i --save-dev fs-extra`

create a file called `create-npm-package.js`.

This is the code of that file:

```javascript
var fs = require('fs-extra');
var pkg = require('./package.json');

var dest = __dirname + '/npm_package/';

fs.removeSync(dest);

/**
 * Go through all the files/folders listed in npm_publish.files
 * inside package.json and copy them to npm_publish.
 */
pkg.npm_package.files.forEach(function (path) {
  if(fs.statSync(__dirname + '/' + path).isFile()) {
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
```

Add following script to package.json
```json
"npm_package": "node ./create-npm-package"
```
