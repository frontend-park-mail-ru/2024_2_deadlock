const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function defaultCssLoader(modules = false, url = true) {
  return ['style-loader', 'css-loader', 'postcss-loader'];
}

function getCssRules() {
  return [
    // RAW СSS
    {
      test: /\.сss$/i,
      exclude: /\.module\.сss$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    },
    // СSS MODULES
    // {
    //   test: /\.module\.сss$/i,
    //   use: [...defaultCssLoader(true)],
    // },
  ];
}

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // {
      //   test: /\.(sa|sc|c)ss$/i,
      //   use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      // },
      ...getCssRules(),
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css', '.scss', '.sass', '.hbs'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      title: 'DEAD-VC.RU',
    }),
  ],
};
