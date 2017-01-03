module.exports = {
  entry: [
    './code/main.ts'
  ],
  output: {
    path: './build',
    filename: 'cardnames.js'
  },
  resolve: {
    extensions: ['', '.tsx', '.ts', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [/node_modules/],
        include: "data/cards.json"
      }
    ]
  },
  devtool: 'source-map'
};
