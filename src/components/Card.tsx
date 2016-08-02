import * as React from 'react';
import CssModules = require('react-css-modules');
import shallowCompare = require('react-addons-shallow-compare');

import styles = require('./Card.scss');

interface CardProps {
  heading?: string;
}

export class CardUnstyled extends React.Component<CardProps, {}> {
  public shouldComponentUpdate(nextProps: CardProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { children, heading } = this.props;

    return (
      <div styleName="container">
        {
          heading && <div styleName="heading">
            { heading }
          </div>
        }
        { children }
      </div>
    );
  }
}

export const Card = CssModules(CardUnstyled, styles);
