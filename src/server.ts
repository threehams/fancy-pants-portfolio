/* eslint-env node */
import path = require('path');
import express = require('express');
import webpack = require('webpack');
import compression = require('compression');
import webpackConfig = require('../webpack.config');

import config from './serverConfig';
import fixturePictures from './fixtures/fixturePictures';

const app = express();

if (config.development) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { chunks: false },
  }));
  app.use('/assets', express.static(path.join( __dirname, '..', 'assets')));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(compression());
  app.use('/dist', express.static(path.join( __dirname, '..', 'dist')));
  app.use('/assets', express.static(path.join( __dirname, '..', 'assets')));
}

app.get('/api/pictures', function(request, response) {
  setTimeout(() => {
    response.send(fixturePictures);
  }, 1000);
});

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(config.port || 8080, function(err: Error) {
  if (err) {
    // tslint:disable
    console.log(err);
    // tslint:enable
    return;
  }

  // tslint:disable
  console.log('Listening at http://localhost, port', config.port);
  // tslint:eisable

});
