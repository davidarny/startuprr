const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const config = require("./webpack.config");
const ReloadPlugin = require("reload-html-webpack-plugin");

const ASSETS_PATH = path.join(__dirname, "assets");
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
        new ReloadPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
