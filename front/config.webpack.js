var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {

    entry: {
        main: [
            path.join(__dirname, 'src/main.js'),
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://0.0.0.0:1234'
            ],
        vendor: [
            'react',
            'react-tap-event-plugin',
            'react-router',
            'material-ui',
            'lodash',
            'reflux'
        ]
    },

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main.js',
        publicPath: '/build/'
    },

    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                include: path.join(__dirname, 'src'),
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                loader: 'file-loader'
            }
        ]

    },

    resolve: {
        alias: {
            actions: path.join(__dirname, 'src', 'actions'),
            components: path.join(__dirname, 'src', 'components'),
            stores: path.join(__dirname, 'src', 'stores'),
            mixins: path.join(__dirname, 'src', 'mixins'),
            utils: path.join(__dirname, 'src', 'utils')
        },
        extensions: ['', '.js', '.jsx']
    },

    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new ExtractTextPlugin('[name].css')

    ],

    devtool: '#eval'

};

module.exports = config;
