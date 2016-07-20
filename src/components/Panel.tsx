import * as React from 'react';
import CssModules = require('react-css-modules');
import shallowCompare = require('react-addons-shallow-compare');
const styles = require('./Panel.scss');

interface PanelProps {
  heading?: string;
}

export class PanelUnstyled extends React.Component<PanelProps, {}> {
  public shouldComponentUpdate(nextProps: PanelProps, nextState: {}) {
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
        <div>
          { children }
        </div>
      </div>
    );
  }
}

export const Panel = CssModules(PanelUnstyled, styles);
