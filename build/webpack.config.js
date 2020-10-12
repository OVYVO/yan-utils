// const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { entry,getHtmlPlugins } = require("./utils");

module.exports = {
  entry,
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    library: 'yan-[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  resolve:{
    extensions:['.js','.jsx','.json']
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
    ],
  },
  plugins: [
    ...getHtmlPlugins(),
    new CleanWebpackPlugin()
  ],
  // devServer: {
  //   contentBase: path.join(__dirname, './dist'), //根目录
  //   open: true, //自动打开浏览器
  //   port: 9000,
  // },
};
