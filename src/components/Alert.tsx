import * as React from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

interface AlertProps {
  text?: string;
  type?: 'error' | 'warning';
}

@Radium
export class Alert extends React.Component<AlertProps, {}> {
  public shouldComponentUpdate(nextProps: AlertProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { text } = this.props;

    return (
      <div style={styles.container}>
        { text }
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'red',
  },
};
