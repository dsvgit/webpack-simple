var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './entry.js',
  output: {
    path: path.join(__dirname, 'dist'),
    //publicPath: './dist/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: true
    }),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(js|jsx|es6)$/i,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      { test: /\.(cshtml|html)$/i, loader: 'html', query: { minimize: false } },
      {
        // simple files
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file?name=assets/[name]-[sha512:hash:base64:7].[ext]'
        ]
      },
      {
        // files with postfixes like 'EAS-Icons.woff?1qdav3'
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/i,
        loaders: [
          'file?name=assets/[name].[ext]'
        ]
      }
    ]
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: './dist/',
    port:8081,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  }
};