const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require("./webpack.config");
const path = require("path");

const IS_DEV = process.env.NODE_ENV === "development";
const OUTPUT_PATH = path.normalize(path.join(__dirname, "./dist"));

module.exports = merge(config, {
    devtool: "cheap-module-source-map",
    output: {
        path: OUTPUT_PATH,
        filename: "[name].[chunkhash].js",
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"],
        }),
        new CleanWebpackPlugin([OUTPUT_PATH]),
        new ExtractTextPlugin({
            filename: "[name].[chunkhash].css",
            allChunks: true,
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
                                sourceMap: IS_DEV,
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: IS_DEV,
                                includePaths: [OUTPUT_PATH],
                            },
                        },
                    ],
                }),
            },
        ],
    },
});
