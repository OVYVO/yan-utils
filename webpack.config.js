// const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const { entry } = require("./utils");

module.exports = {
  entry,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/yan-utils/',
    filename: '[name].js',
    library: 'yan-[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    unknownContextCritical: false,
    rules: [
    {
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }, ],
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};