import * as React from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

@Radium
export class GridList extends React.Component<{}, {}> {
  public shouldComponentUpdate(nextProps: {}, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { children } = this.props;

    return (
      <div style={styles.container}>
        { children }
      </div>
    );
  }
}

const styles = {
  container: {
    paddingTop: 4,
  },
};
