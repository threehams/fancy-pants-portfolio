import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';
import { State } from './models';

declare var module: { hot: any };

const configureStore = (initialState?: State) => {
  // const win: any = window;
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-undef, no-process-env
    // win.devToolsExtension && process.env.NODE_ENV !== 'production' ? win.devToolsExtension() : f => f
  )(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
