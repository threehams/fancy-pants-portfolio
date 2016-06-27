/* eslint-env node */
/* eslint no-process-env:0 */
/* eslint no-var:0 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENTRY_POINTS = {
  development: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './src/index.tsx'],
  production: ['./src/index.tsx'],
};

var ENV = process.env.NODE_ENV || 'development';

var PLUGINS = {
  development: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'development\''
      }
    }),
  ],
  production: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'production\''
      }
    }),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    })
  ]
};
var DEV_TOOLS = {
  development: 'eval',
  production: 'source-map'
};
var CSS_LOADERS = {
  development: {
    test: /\.css$/,
    loaders: [
      'style?sourceMap',
      'css?modules&importLoaders=1&localIdentName=[path]__[name]__[local]'
    ],
  },
  production: {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css?modules&importLoaders=1&localIdentName=[name]__[local]'
    )
  }
};

module.exports = {
  devtool: DEV_TOOLS[ENV],
  entry: ENTRY_POINTS[ENV],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: PLUGINS[ENV],
  resolve: {
    root: [path.resolve('src')],
    extensions: ['', '.jsx', '.js', '.tsx', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.(tsx|ts|js)/,
        loaders: ['react-hot-loader/webpack', 'ts'],
        include: path.join(__dirname, 'src')
      },
      CSS_LOADERS[ENV],
      {
        test: /\.json$/,
        loader: 'json',
      }
    ]
  }
};
