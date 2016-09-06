/* eslint-env node */
import path = require('path');
import url = require('url');
import express = require('express');
import webpack = require('webpack');
import compression = require('compression');

import config from './serverConfig';
import database from './fixtures/database';
import indexTemplate from './indexTemplate';

const app = express();

if (config.development) {
  // tslint:disable
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');
  // tslint:enable

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

const createPictureData = (picture) => {
  let sources;
  if (picture.sources) {
    sources = picture.sources.map((source) => ({
      url: url.resolve(config.aws.cloudfrontHost, source.filename),
      width: source.width,
    }));
  } else {
    const [base, extension] = picture.filename.split('.');
    sources = [2500, 2000, 1504, 1008, 752, 512].map((size) => {
      return {
        url: url.resolve(config.aws.cloudfrontHost, `${base}.${size}w.${extension}`),
        width: size,
      };
    });
  }
  const derived = {
    sources,
    thumbnailUrl: url.resolve(config.aws.cloudfrontHost, picture.filename.replace('.jpg', '.thumb.jpg')),
    url: url.resolve(config.aws.cloudfrontHost, picture.filename),
  };
  return Object.assign({}, picture, derived);
};

// TODO database will eventually not be a fixture, so pictures.pictures will go away
const createPictureList = (data) => {
  return data.pictures.map(createPictureData);
};

app.get('*', function(request, response) {
  response.send(indexTemplate({
    banner: createPictureData(database.banner),
    pictures: createPictureList(database),
  }));
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
