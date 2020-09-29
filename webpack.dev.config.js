const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/utils.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'), //根目录
        open: true, //自动打开浏览器
        port: 9000,
    },
};
