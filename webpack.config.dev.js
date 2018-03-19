const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const config = require("./webpack.config");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const OUTPUT_PATH = path.normalize(path.join(__dirname, "./dist"));
const ASSETS_PATH = path.normalize(path.join(__dirname, "./assets"));
const DEV_SERVER_PORT = 8080;

module.exports = merge(config, {
    devtool: "eval",
    devServer: {
        open: true,
        port: DEV_SERVER_PORT,
        hot: true,
        contentBase: [ASSETS_PATH],
        watchContentBase: true,
    },
    output: {
        pathinfo: true,
        publicPath: "/",
        filename: "[name].js",
    },
    plugins: [
        new CleanWebpackPlugin([OUTPUT_PATH]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
