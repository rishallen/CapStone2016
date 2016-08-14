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
  }
};
