const webpack = require('webpack');
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    devServer:{
        disableHostCheck: true
    },
    entry: {
        index: [path.resolve(__dirname, 'src/app')]
    },
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: 'js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.web.js', '.jsx', '.js', '.json'],
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        alias: {
//            "H5lock": path.resolve(__dirname, 'src/lib/H5lock.publish.js'),
//            "hidpi-canvas-polyfill": path.resolve(__dirname, 'src/lib/hidpi-canvas.min.js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'happypack/loader?id=js',
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.scss/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.jpe?g$|\.gif$|\.svg$|\.png$/i,
                exclude: /node_modules/,
                loader: 'url?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(svg)$/i,
                loader: require.resolve('svg-sprite-loader'),
                include: [
                  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
                  //path.resolve(__dirname, './svg/'),  // 2. 自己私人的 svg 存放目录
                ]
            }
        ]
    },
    postcss: function () {
        return [
            autoprefixer({
                browsers: ['last 3 versions', '> 1%']
            }),
            pxtorem({
                rootValue: 100,
                propWhiteList: [],
            }),
            cssnano
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "",
            hash: true,
            baseUrl: '/',
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/vendor-manifest.json')
        }),
        new ExtractTextPlugin("css/[name].css"),

        new webpack.NoErrorsPlugin(),
        new HappyPack({
            id: 'js',
            threads: 8,
            loaders: [{
                path: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: [
                        "transform-runtime",
                        "transform-decorators-legacy",
                        "transform-class-properties", ["import", { libraryName: "antd-mobile", style: "css" }]
                    ]
                }
            }]
        })
    ]
};
