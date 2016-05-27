import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import Layout from './Layout';

export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.any // how do I test for a Redux store?
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <Layout />
      </Provider>
    );
  }
}
