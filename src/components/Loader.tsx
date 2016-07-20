import * as React from 'react';
import CssModules = require('react-css-modules');
import shallowCompare = require('react-addons-shallow-compare');
const styles = require('./Loader.scss');

interface LoaderProps {
  showUntil?: boolean;
}

export class LoaderUnstyled extends React.Component<LoaderProps, {}> {
  public shouldComponentUpdate(nextProps: LoaderProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    if (!this.props.showUntil) {
      return (
        <div>
          <div styleName="loader" />
        </div>
      );
    }
    return <div>{ this.props.children }</div>;
  }
}

export const Loader = CssModules(LoaderUnstyled, styles);
