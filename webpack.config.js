var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname + "/public/js",
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./script.js",
    output: {
        path: __dirname,
        filename: "script.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ],

    module: {
        loaders: [
            {
                test: /\.css$/, loader: "style!css", },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties'],
                }
            }
        ]
    }
};