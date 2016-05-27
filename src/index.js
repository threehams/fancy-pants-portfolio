import './style.css';

// Import only needed polyfills - saves lots of space and bundling time
import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';

import App from './views/App';
import configureStore from './configureStore';

const store = configureStore(Map());

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
