const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const path = require('path')
const distPath = path.resolve(__dirname, './dist')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  target: 'web',
  mode: 'production',
  entry: {
    index: './src/js/index.js',
    detail: './src/js/detail.js'
  },
  output: {
    filename: `js/[name].[chunkhash].js`,
    path: distPath,
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@css': `${__dirname}/src/css`
    },
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    // new WebpackMd5Hash(),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimize: true,
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        priority: false,
        vendor: {
          chunks: 'all',
          test: /vue/,
          name: 'vendor',
          minSize: 30000,
          minChunks: 1,
          enforce: true,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          reuseExistingChunk: true
        }
      }
    }
  }
}
