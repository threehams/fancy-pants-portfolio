/* eslint-env node */
/* eslint no-process-env:0 */
/* eslint no-var:0 */

var path = require('path');
var webpack = require('webpack');

var ENTRY_POINTS = {
  development: {
    bundle: ['eventsource-polyfill', 'webpack-hot-middleware/client', './src/index'],
  },
  production: {
    bundle: ['./src/index'],
  }
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
  ]
};
var DEV_TOOLS = {
  development: 'eval',
  production: 'source-map'
};

module.exports = {
  devtool: DEV_TOOLS[ENV],
  entry: ENTRY_POINTS[ENV],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  plugins: PLUGINS[ENV],
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
