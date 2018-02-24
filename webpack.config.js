const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const IS_DEV = process.env.NODE_ENV === "development";
const NODE_DIR = path.normalize(path.join(__dirname, "./node_modules"));
const APP_DIR = path.normalize(path.join(__dirname, "./app"));
const ASSETS_DIR = path.normalize(path.join(__dirname, "./assets"));
const TEMPLATE_PATH = path.normalize(path.join(__dirname, "./index.ejs"));

const APP_TITLE = "Startuprr Project";

// TODO: need tree shaking
module.exports = {
    entry: {
        vendor: ["bootstrap-sass", "jquery"],
        bundle: path.join(APP_DIR, "index"),
    },
    resolve: {
        modules: [
            NODE_DIR,
            APP_DIR,
            ASSETS_DIR,
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV,
        }),
        new HtmlWebpackPlugin({
            template: TEMPLATE_PATH,
            title: APP_TITLE,
        }),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
        }),
    ],

    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
                options: {
                    compact: IS_DEV,
                },
            },
            // CSS/SASS
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
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
                            includePaths: [ASSETS_DIR],
                        },
                    },
                ],
            },
            // EJS
            {
                test: TEMPLATE_PATH,
                use: [
                    "ejs-compiled-loader",
                    "extract-loader",
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                        },
                    },
                ],
            },
            // IMAGES
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[hash].[ext]",
                },
            },
        ],
    },
};
