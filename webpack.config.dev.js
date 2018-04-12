const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const config = require("./webpack.config");
const LiveReloadPlugin = require("webpack-livereload-plugin");

const DEV_SERVER_PORT = 8080;

module.exports = merge(config, {
    devtool: "eval",
    watch: true,
    devServer: {
        open: true,
        hot: false,
        port: DEV_SERVER_PORT,
        historyApiFallback: true,
    },
    output: {
        pathinfo: true,
        publicPath: "/",
        filename: "[name].js",
    },
    plugins: [
        new LiveReloadPlugin({
            appendScriptTag: true,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    performance: {
        hints: false,
    },
});
