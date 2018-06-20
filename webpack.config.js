var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var clientConfig = {
  entry: './src/client/index.tsx',
  mode: 'development',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './bundle.js'
  },
  resolve: {
      extensions: ['.js', '.ts', '.tsx']
  },
  module: {
      rules: [
        {
              test: /\.tsx?$/,
              loader:'awesome-typescript-loader'
          }
      ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

var serverConfig = {
  entry: './src/server/index.tsx',
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
        {
          test: /\.tsx?$/,
          loader:'awesome-typescript-loader'
        },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

module.exports = [clientConfig, serverConfig];
