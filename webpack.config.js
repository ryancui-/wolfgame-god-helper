/**
 * Created by ryancui on 2016/10/29.
 */
var webpack = require('webpack')

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: 'app/dest',
    filename: 'bundle.js',
    publicPath: '/dest/'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false,
    //  },
    //  output: {
    //    comments: false,
    //  },
    //}),
  ]
}