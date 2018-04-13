const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const config = require("./webpack.config");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const IS_DEV = process.env.NODE_ENV === "development";

module.exports = merge(config, {
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[chunkhash].js",
        chunkFilename: "chunk.[id].[chunkhash:8].js",
    },
    plugins: [
        new UglifyJsPlugin({
            parallel: true,
            cache: true,
            uglifyOptions: {
                compress: {
                    warnings: false,
                    comparisons: false,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    comments: false,
                    ascii_only: true,
                },
            },
            sourceMap: !IS_DEV,
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.scss$|\.html$/,
            threshold: 10240,
            minRatio: 0,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["bundle", "vendor", "manifest"],
            filename: "[name].[chunkhash].js",
            children: true,
            minChunks: 2,
        }),
    ],
});
