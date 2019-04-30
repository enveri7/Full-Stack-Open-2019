// Config file for webpack, im not using this file because
// of configuring semantic-ui was too troublesome

const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
    console.log('argv', argv.mode)

    const backend_url = argv.mode === 'production'
        ? 'heroku' // TODO
        : 'http://localhost:3000'

    return {
        entry: ['@babel/polyfill', './src/index.js'],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
            proxy: {
                '/api': 'http://localhost:3001'
            }
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        compact: false,
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}
module.exports = config