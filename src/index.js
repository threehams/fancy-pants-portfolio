import './style.css';

// Import only needed polyfills - saves lots of space and bundling time
import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Perf from 'react-addons-perf';

import App from './views/App';
import configureStore from './configureStore';

window.Perf = Perf;

const store = configureStore(Map());

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
