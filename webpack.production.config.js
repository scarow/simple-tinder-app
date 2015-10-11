var ConfigPlugin = require('webpack-config-plugin');
var path = require('path');

module.exports = {
    entry: [
        './index.jsx'
    ],
    output: {
        filename: 'bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        path: 'dist'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['jsx-loader?harmony', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ConfigPlugin({ dir: path.join(__dirname, 'config')})
    ]
}