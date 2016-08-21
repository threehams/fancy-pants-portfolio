import * as React from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

interface GridListProps {
  maxWidth: number;
  minWidth: number;
  spacing: number;
}

// constants are fine - these take years to change
const RESOLUTION_MIN = 320;
const RESOLUTION_MAX = 4096;

@Radium
export class GridList extends React.Component<GridListProps, {}> {
  public shouldComponentUpdate(nextProps: GridListProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { children, maxWidth, minWidth, spacing } = this.props;

    const itemStyles = this.createMediaStyles(maxWidth, minWidth, spacing);

    return (
      <div style={styles.container}>
        { React.Children.map(children, (child) => <div style={[styles.item, itemStyles]}>{ child }</div>) }
      </div>
    );
  }

  private createMediaStyles(maxWidth: number, minWidth: number, spacing: number): Object {
    const queryCount = Math.floor((RESOLUTION_MAX - RESOLUTION_MIN) / (maxWidth + spacing));
    return Array.from(Array(queryCount).keys()).reduce((styles, index) => {
      const columnCount = index + 1;
      const breakpoint = index * (maxWidth + spacing) - spacing;
      const columnWidth = 100 / (columnCount);
      styles[`@media(min-width: ${breakpoint}px)`] = { width: `calc(${columnWidth}% - ${spacing}px)`};
      return styles;
    }, {});
  }
}

const styles = {
  container: {
    margin: '0 -2px',
    paddingTop: 4,
  },
  item: {
    display: 'inline-block',
    padding: '0 2px',
  },
};
