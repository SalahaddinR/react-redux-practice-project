const path = require('path');
const dotenv = require('dotenv').config();

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        index: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js',
        path: path.resolve(__dirname, 'build'),
        clean: process.env.NODE_ENV === 'production' ? true: false
    },
    module: {
        rules: [
            {
                test: /.(js|cjs|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                ]
            },
            {
                test: /.(css|sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /.(png|jpg|svg|webp)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ],
    resolve: {
        extensions: [
            '.js', '.cjs', '.json', '.jsx', '.scss', '.sass'
        ],
        alias: {
            styles: path.resolve(__dirname, 'src/stylesheets'),
            images: path.resolve(__dirname, 'assets')
        }
    },
    devServer: {
        static: path.resolve(__dirname, 'build'),
        port: process.env.PORT || 9000,
        historyApiFallback: true
    }
}