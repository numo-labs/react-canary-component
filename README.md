# react-canary-component

## How to Setup a React Webpack Babel Project
Boilerplate for setting up a repository with minimal dependencies as a  across all projects.

## Basic
Initialize your project by running the `$ npm init` command in the terminal.  

Basic file structure:
```
.
├── LICENSE
├── package.json
├── README.md
├── src
│   ├── app.js
│   └── index.html
├── test         
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
