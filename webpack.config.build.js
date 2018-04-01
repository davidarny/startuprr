const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const config = require("./webpack.config");
const path = require("path");

const IS_DEV = process.env.NODE_ENV === "development";
const OUTPUT_PATH = path.join(__dirname, "dist");

module.exports = merge(config, {
    devtool: "cheap-module-source-map",
    output: {
        path: OUTPUT_PATH,
        filename: "[name].[chunkhash].js",
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
            cache: IS_DEV,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"],
        }),
        new ExtractTextPlugin({
            filename: "[name].[chunkhash].css",
            allChunks: !IS_DEV,
        }),
    ],
    module: {
        rules: [
            // CSS/SASS
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                minimize: !IS_DEV,
                            },
                        },
                        "resolve-url-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                includePaths: [OUTPUT_PATH],
                            },
                        },
                    ],
                }),
            },
        ],
    },
});
