const path = require('path');
const webpack = require('webpack');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const vendors = [
    'react',
    'react-dom',
    'react-router',
    'antd-mobile',
    'axios'
];
module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, 'build/js'),
        filename: '[name].dll.js',
        library: '[name]_dll'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'build', '[name]-manifest.json'),
            name: '[name]_dll',
            context: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        })
    ]
};