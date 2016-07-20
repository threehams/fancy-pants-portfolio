import * as React from 'react';
import CssModules = require('react-css-modules');
import shallowCompare = require('react-addons-shallow-compare');
const styles = require('./Alert.scss');

interface AlertProps {
  text?: string;
  type?: 'error' | 'warning';
}

export class AlertUnstyled extends React.Component<AlertProps, {}> {
  public shouldComponentUpdate(nextProps: AlertProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { text } = this.props;

    return (
      <div styleName="container">
        { text }
      </div>
    );
  }
}

export const Alert = CssModules(AlertUnstyled, styles);
