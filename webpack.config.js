const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const IS_DEV = process.env.NODE_ENV === "development";
const NODE_DIR = path.normalize(path.join(__dirname, "./node_modules"));
const APP_DIR = path.normalize(path.join(__dirname, "./app"));
const ASSETS_DIR = path.normalize(path.join(__dirname, "./assets"));
const TEMPLATE_PATH = path.normalize(path.join(__dirname, "./index.hbs"));
const ROOT_DIR = path.normalize(__dirname);
const BUNDLE_ANALYZER_PORT = 8888;
const APP_TITLE = "Startuprr Project";

module.exports = {
    cache: true,
    entry: {
        vendor: ["bootstrap-sass", "jquery"],
        bundle: [path.join(APP_DIR, "index")],
    },
    resolve: {
        modules: [
            NODE_DIR,
            APP_DIR,
            ASSETS_DIR,
        ],
        alias: {
            assets: ASSETS_DIR,
            root: ROOT_DIR,
        },
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerPort: BUNDLE_ANALYZER_PORT,
            openAnalyzer: true,
        }),
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV,
        }),
        new HtmlWebpackPlugin({
            cache: IS_DEV,
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
            // Babel
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
                options: {
                    compact: !IS_DEV,
                    cacheDirectory: IS_DEV,
                },
            },
            // CSS/SCSS
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
            // Handlebars
            {
                test: /\.hbs$/,
                use: [
                    "handlebars-loader",
                    "extract-loader",
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                        },
                    },
                ],
            },
            // Images
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
