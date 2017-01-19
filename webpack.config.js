var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.ejs',
      inject: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(jsx|es6|js)$/i,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      { test: /\.(cshtml|html|ejs)$/i, loader: 'html', query: { minimize: false } },
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
  devServer: {
    contentBase: './build',
    port: 8081,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  devtool: "eval-source-map"
};