var webpack = require('webpack'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    devtool: 'eval',
    entry: {
        index: './app/app.js'
    },
    output: {
        filename: './public/bin/[name].js'
    },
    module: {
        loaders: [
            {
                test: /app(\/|\\).*\.js$/,
                loader: 'babel-loader?stage=0'
            }
        ]
    },
    plugins: [
        //new CommonsChunkPlugin('./public/common.js'),
        //new webpack.optimize.UglifyJsPlugin({})
    ]
};
