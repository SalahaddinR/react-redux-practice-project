const path = require('path');
const NodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    mode: process.env.NODE_ENV === 'production' ? 'production': 'development',
    entry: {
        server: path.resolve(__dirname, 'src/server.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js': '[name].js'
    },
    module: {
        rules: [
            {
                test: /(cjs|mjs|js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    externals: [NodeExternals()],
    resolve: {
        extensions: ['.js', '.cjs', '.mjs']
    }
}