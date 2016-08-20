import * as React from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

interface LoaderProps {
  showUntil?: boolean;
}

export class LoaderBase extends React.Component<LoaderProps, {}> {
  public shouldComponentUpdate(nextProps: LoaderProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    if (!this.props.showUntil) {
      return (
        <div style={styles.loader}>
          <div style={styles.loaderInner} />
        </div>
      );
    }
    return <div>{ this.props.children }</div>;
  }
}

const loaderKeyframes = Radium.keyframes({
  from: {
    left: -200,
    width: '30%',
  },
  '50%': {
    width: '30%',
  },
  '70%': {
    width: '70%',
  },
  '80%': {
    left: '50%',
  },
  '95%': {
    left: '120%',
  },
  to: {
    left: '100%',
  },
});

const styles = {
  loader: {
    backgroundColor: '#ddd',
    height: 4,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  loaderInner: {
    // 'x' is placeholder, per Radium docs
    animation: 'x 2s linear infinite',
    animationName: loaderKeyframes,
    backgroundColor: '#2980b9',
    display: 'block',
    height: 4,
    left: -200,
    position: 'absolute',
    width: 200,
  },
};

export const Loader = Radium(LoaderBase);
