const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  devtool: 'cheap-module-source-map',
  devServer: {
    stats: 'minimal',
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
