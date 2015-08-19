var webpack = require("webpack"),
  path = require("path"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./entry.js",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
};