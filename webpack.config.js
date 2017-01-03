module.exports = {
  entry: [
    './code/main.ts'
  ],
  output: {
    path: './build',
    filename: 'cardnames.js'
  },
  resolve: {
    extensions: ['', '.tsx', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        //exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.ts(x?)$/,
        //exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  devtool: 'source-map'
};
