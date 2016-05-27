/* eslint-env node */
import path from 'path';
import express from 'express';
import webpack from 'webpack';

import config from './serverConfig';

import compression from 'compression';

const webpackConfig = require('../webpack.config');

const app = express();
const PORT = config.port || 8080;

if (config.development) {
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use('/assets', express.static(path.join( __dirname, '..', 'assets')));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(compression());
  app.use('/dist', express.static(path.join( __dirname, '..', 'dist')));
  app.use('/assets', express.static(path.join( __dirname, '..', 'assets')));
}

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(PORT, function(err) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
    return;
  }

  console.log('Listening at http://localhost, port', PORT); //eslint-disable-line no-console
});
