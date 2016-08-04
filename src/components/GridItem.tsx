import * as React from 'react';
import CssModules = require('react-css-modules');
import shallowCompare = require('react-addons-shallow-compare');

import styles = require('./GridItem.scss');

const NEUTRAL_GRAY = 8388608;

interface GridItemProps {
  heading?: string;
  backgroundColor?: string;
}

export class GridItemUnstyled extends React.Component<GridItemProps, {}> {
  public shouldComponentUpdate(nextProps: GridItemProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { backgroundColor, children, heading } = this.props;

    const color = this.textColor(backgroundColor);
    return (
      <div styleName="container">
        { children }
        { heading && <div styleName="heading" style={{ backgroundColor, color }}>{ heading }</div> }
      </div>
    );
  }

  // Determine black/white text color based on perceived brightness of background.
  // From: https://github.com/jamiebrittain/colourBrightness.js
  private textColor(backgroundColor) {
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);

    if ((r * 299 + g * 587 + b * 114) / 1000 < 125) {
      return 'white';
    }
    return 'black';
  }
}

export const GridItem = CssModules(GridItemUnstyled, styles);
