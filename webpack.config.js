var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractCSS = new ExtractTextPlugin('styles/[name].css')

const sassLoaders = [
  'css-loader',
  'sass-loader'
]

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.sass', '.scss']
  },

  devtool: 'source-map',

  target: 'node',

  entry: './src/index.jsx',

  output: {
    filename: 'public/[name].js',
    chunkFilename: 'public/[id].chunk.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('scripts/common.js'),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.SQUAD_HOST': JSON.stringify(process.env.SQUAD_HOST || 'http://localhost:4000')
    }),
    extractCSS
  ]
}
