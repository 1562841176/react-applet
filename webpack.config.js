var webpack = require('webpack');
module.exports = {
  entry: './src/app.js',
  output: {
      path: __dirname + '/build',
      filename: "bundle.js"
  },
  mode: 'development', // 设置mode
  module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
              plugins: [],
              presets: ['@babel/env', '@babel/react']
          }
      }, {
          test: /\.css$/,
          loader: "style-loader!css-loader"
      }]
  }
};
