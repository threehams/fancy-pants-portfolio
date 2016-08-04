import * as React from 'react';
import CssModules = require('react-css-modules');
import shallowCompare = require('react-addons-shallow-compare');

import styles = require('./GridList.scss');

export class GridListUnstyled extends React.Component<{}, {}> {
  public shouldComponentUpdate(nextProps: {}, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { children } = this.props;

    return (
      <div styleName="container">
        { children }
      </div>
    );
  }
}

export const GridList = CssModules(GridListUnstyled, styles);
