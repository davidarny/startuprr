const webpack = require("webpack");
const merge = require("webpack-merge");
const config = require("./webpack.config");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const DEV_SERVER_PORT = 8080;
const BUNDLE_ANALYZER_PORT = 8888;

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
        new BundleAnalyzerPlugin({
            analyzerPort: BUNDLE_ANALYZER_PORT,
            openAnalyzer: true,
        }),
        new LiveReloadPlugin({appendScriptTag: true}),
        new webpack.NamedModulesPlugin(),
    ],
    performance: {
        hints: false,
    },
});
