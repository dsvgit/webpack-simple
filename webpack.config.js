var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './entry.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      
    }),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
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
  devtool: "eval-source-map"
};