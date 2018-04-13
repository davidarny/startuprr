const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const OUTPUT_PATH = path.join(__dirname, "dist");
const IS_DEV = process.env.NODE_ENV === "development";
const NODE_DIR = path.join(__dirname, "node_modules");
const APP_DIR = path.join(__dirname, "app");
const ASSETS_DIR = path.join(__dirname, "assets");
const TEMPLATES_PATH = path.join(__dirname, "assets", "templates");
const TEMPLATE_PATH = path.join(__dirname, "index.hbs");
const ROOT_DIR = path.join(__dirname, ".");
const BUNDLE_ANALYZER_PORT = 8888;
const APP_TITLE = "Startuprr Project";

module.exports = {
    cache: true,
    bail: true,
    target: "web",
    entry: {
        vendor: ["bootstrap-sass", "jquery", path.join(ASSETS_DIR, "styles", "vendor.scss")],
        bundle: [path.join(APP_DIR, "index.js")],
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
        new CleanWebpackPlugin([OUTPUT_PATH]),
        new BundleAnalyzerPlugin({
            analyzerPort: BUNDLE_ANALYZER_PORT,
            openAnalyzer: IS_DEV,
        }),
        new webpack.DefinePlugin({
            IS_DEV: JSON.stringify(IS_DEV),
        }),
        new HtmlWebpackPlugin({
            cache: IS_DEV,
            template: TEMPLATE_PATH,
            title: APP_TITLE,
            minify: {
                removeComments: !IS_DEV,
                collapseWhitespace: !IS_DEV,
                removeRedundantAttributes: !IS_DEV,
                useShortDoctype: !IS_DEV,
                removeEmptyAttributes: !IS_DEV,
                removeStyleLinkTypeAttributes: !IS_DEV,
                keepClosingSlash: !IS_DEV,
                minifyJS: !IS_DEV,
                minifyCSS: !IS_DEV,
                minifyURLs: !IS_DEV,
            },
        }),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
        }),
        new ExtractTextPlugin({
            filename: IS_DEV ? "[name].css" : "[name].[chunkhash].css",
            allChunks: !IS_DEV,
        }),
    ],
    module: {
        unsafeCache: IS_DEV,
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
            // Handlebars
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: "handlebars-loader",
                        options: {
                            helperDirs: [TEMPLATES_PATH],
                        },
                    },
                    "extract-loader",
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                        },
                    },
                ],
            },
            // Fonts
            {
                test: /\.(woff2?|ttf|otf|eot|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: IS_DEV ? "[path][name].[ext]" : "[path][name].[hash].[ext]",
                        },
                    },
                ],
            },
            // Images
            {
                test: /\.(jpe?g|png|gif|webp)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: IS_DEV ? "[path][name].[ext]" : "[path][name].[hash].[ext]",
                        },
                    },
                    !IS_DEV && {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: "65-90",
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75,
                            },
                        },
                    },
                ].filter(option => option !== false),
            },
        ],
    },
    node: {
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty",
    },
};
