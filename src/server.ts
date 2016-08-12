/* eslint-env node */
import path = require('path');
import express = require('express');
import webpack = require('webpack');
import compression = require('compression');

import config from './serverConfig';
import database from './fixtures/database';

const app = express();

if (config.development) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { chunks: false },
  }));
  app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(compression());
  app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
  app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
}

app.get('/api/pictures', function(request, response) {
  const pictures = database.pictures.map((picture) => {
    const derived = {
      thumbnailUrl: `/assets/${picture.filename.replace('.jpg', '_thumb.jpg')}`,
      url: `/assets/${picture.filename}`,
    };
    return Object.assign({}, picture, derived);
  });
  setTimeout(() => {
    response.send(pictures);
  }, 25);
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
