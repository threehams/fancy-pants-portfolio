import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

export class Layout extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {

  };

  render() {

    return (
      <div>
        oh hai mark
      </div>
    );
  }
}

export default connect((state) => {
  return {

  };
}, {

})(Layout);

const styles = {

};
