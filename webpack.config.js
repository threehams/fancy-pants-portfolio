/* eslint-env node */
/* eslint no-process-env:0 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENTRY_POINTS = {
  development: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './src/index.tsx'],
  production: ['./src/index.tsx'],
};

const ENV = process.env.NODE_ENV || 'development';
const extractModules = new ExtractTextPlugin('components.css', { allChunks: true });
const extractBootstrap = new ExtractTextPlugin('bootstrap.css', { allChunks: true });

const PLUGINS = {
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
    extractModules,
    extractBootstrap,
  ]
};
const DEV_TOOLS = {
  development: 'eval',
  production: 'source-map'
};
const CSS_LOADERS = {
  development: [
    {
      test: /^(?:(?!bootstrap).)*\.scss$/,
      loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]__[name]__[local]',
        'sass',
      ],
    },
    {
      test: /bootstrap\.scss$/,
      loaders: ['style?sourceMap', 'css', 'sass'],
    }
  ],
  production: [
    {
      test: /^(?:(?!bootstrap).)*\.scss$/,
      loader: extractModules.extract(
        'style',
        'css?modules&importLoaders=1&localIdentName=[path]__[name]__[local]',
        'sass'
      )
    },
    {
      test: /bootstrap\.scss$/,
      loader: extractBootstrap.extract('style', 'css', 'sass')
    }
  ]
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
      ...CSS_LOADERS.development,
      {
        test: /\.json$/,
        loader: 'json',
      }
    ]
  }
};
