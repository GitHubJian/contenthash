const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const path = require('path')
const distPath = path.resolve(__dirname, './dist')
const webpack = require('webpack')

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
    new WebpackMd5Hash(),
    // new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    // namedChunks: true
  }
}
