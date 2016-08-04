import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import { PicturesApp, PictureApp } from './';
import { AdminApp } from './admin';

interface AppProps {
  store: any;
}

export class App extends React.Component<AppProps, {}> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={PicturesApp}>
            <Route path="/pictures/:pictureId" component={PictureApp} />
          </Route>
          <Route path="/admin" component={AdminApp} />
        </Router>
      </Provider>
    );
  }
}
