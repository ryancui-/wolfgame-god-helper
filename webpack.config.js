/**
 * Created by ryancui on 2016/10/29.
 */
var webpack = require('webpack')

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: __dirname,
    filename: 'app/dest/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]
}