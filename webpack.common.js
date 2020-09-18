const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
require('dotenv/config')

const isDevelopment = process.env.NODE_ENV === 'development'
console.log('process', process.env)
const fs = require('fs');

let templates = [];
const files = fs.readdirSync('src/pug');

files.forEach(file => {
  if (file.match(/\.pug$/)) {
    const filename = file.substring(0, file.length - 4);
    templates.push(
      new HtmlWebpackPlugin({
        template: `src/pug/${filename}.pug`,
        filename: `${filename}.html`
      })
    );
  }
});

module.exports = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  entry: {
    app: path.join(__dirname, 'src', 'index'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
 
  module: {   
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            }
          },
        ],
      },
      { 
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      
    ],
  },
  plugins: [
    ...templates,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.js', '.scss']
  }

};