const merge = require("webpack-merge");
const config = require("./webpack.config");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const DEV_SERVER_PORT = 8080;
const BUNDLE_ANALYZER_PORT = 8888;

module.exports = merge(config, {
    devtool: "eval",
    devServer: {
        open: true,
        port: DEV_SERVER_PORT,
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
    ],
});
