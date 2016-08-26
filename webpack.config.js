var webpack = require('webpack');
module.exports = {
  module: {
      noParse: /node_modules\/json-schema\/lib\/validate\.js/,
      loaders: [
          { test: /\.json$/, loader: "json" }
      ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  entry:
    "./main.js",

 output: {
   filename: "main.bundle.js"
 },
 plugins: [
   new webpack.ProvidePlugin({
      d3: 'd3'
  })
 ]
};
