import * as React from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');
import shadows from '../styles/shadows';

interface CardProps {
  heading?: string;
  style?: Object;
}

@Radium
export class Card extends React.Component<CardProps, {}> {
  public shouldComponentUpdate(nextProps: CardProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { children, heading, style } = this.props;

    return (
      <div style={[styles.container, style]}>
        {
          heading && <div style={styles.heading}>
            { heading }
          </div>
        }
        { children }
      </div>
    );
  }
}

const styles = {
  container: {
    borderRadius: 2,
    boxShadow: shadows[1],
    marginBottom: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  heading: {
    backgroundColor: 'black',
    borderRight: '1px solid white',
    borderTop: '1px solid white',
    bottom: 0,
    color: 'white',
    minWidth: '33%',
    padding: 5,
    position: 'absolute',
    textAlign: 'center',
  },
};
