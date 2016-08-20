import './styles/bootstrap.scss';

// Import only needed polyfills - saves lots of space and bundling time
import './polyfills';

import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { List } from 'immutable';

import { App } from './views/App';
import configureStore from './configureStore';
import { Picture } from './models';
import { fetchPictures } from './actions/pictureActions';

// picture API response injected into page by server
declare var PICTURE_DATA: List<Picture>;

const store = configureStore(undefined);
store.dispatch<any>(fetchPictures(PICTURE_DATA));

render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  document.getElementById('root')
);

declare var module: { hot: any };

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const App = require('./views/App').App;
    render(
      <AppContainer>
        <App store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
