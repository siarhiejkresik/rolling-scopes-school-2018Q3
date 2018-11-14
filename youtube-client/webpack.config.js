const HtmlWebPackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      title: 'qwerty',
    }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        // use: [MiniCssExtractPlugin.loader, 'css-loader'],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    overlay: true,
  },
  devtool: 'source-map',
};
