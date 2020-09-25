const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const dotenv = require('dotenv-webpack');
const storeName = 'telhanorte';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    hot: true,
    compress: true,
    port: 3333,
    historyApiFallback: true,
    writeToDisk: true,
    open: {
      app: 'chrome'
    },
    proxy: { 
      // '/app': {
      //   target: 'telhanorte.vtexcommercestable.com.br',
      //   secure: false,
      //   pathRewrite: { '^/app': '' }
      // }
      '/app/' : 'http://localhost:3000'
    },
    before: (app, server, compiler) => {
      app.get('/app/', (req, res) => {
        res.redirect('https://telhanorte.vtexcommercestable.com.br');
      });
    },
  },
  plugins: [new dotenv()],
});

// 'telhanorte.vtexcommercestable.com.br'