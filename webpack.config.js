var webpack = require("webpack"),
  path = require("path"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  resolve: {
    alias: {
      "jquery": path.join(__dirname, "bower_components/jquery/dist/jquery.js")
    }
  },
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
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      CKEDITOR_BASEPATH_EAS: JSON.stringify('file:///'+path.join(__dirname, "app/vendor/static/ckeditor/"))
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  }
};