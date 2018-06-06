const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('public/[name].css')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  devtool: 'source-map',

  target: 'electron-renderer',

  entry: './src/index.jsx',

  output: {
    filename: 'public/[name].js',
    chunkFilename: 'public/[id].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS
        ]
      }
    ]
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('scripts/common.js'),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.DefinePlugin({
      'process.env.PATH': JSON.stringify(process.env.PATH)
    }),
    extractCSS
  ]
}
