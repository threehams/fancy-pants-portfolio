import * as React from 'react';
import { Provider } from 'react-redux';
import * as Html5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Router, Route, browserHistory } from 'react-router';

import { Pictures, Picture } from './';

interface AppProps {
  store: any;
}

class BaseApp extends React.Component<AppProps, {}> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={Pictures}></Route>
          <Route path="/photos/:photoId" component={Picture}/>
        </Router>
      </Provider>
    );
  }
}

const Html5Context = DragDropContext(Html5Backend);
export const App: any = Html5Context(BaseApp);
