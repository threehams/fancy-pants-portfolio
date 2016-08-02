import './styles/bootstrap.scss';

// Import only needed polyfills - saves lots of space and bundling time
import './polyfills';

import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './views/App';
import configureStore from './configureStore';

const store = configureStore(undefined);

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
