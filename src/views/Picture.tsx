import * as React from 'react';
import { connect } from 'react-redux';

import { Alert, Loader } from '../components';
import { State } from '../models';

interface PhotoProps {
  alertText?: string;
}

export class BasePicture extends React.Component<PhotoProps, {}> {
  public render() {
    const {
      alertText,
    } = this.props;

    return (
      <div>
        <Alert type="error" text={alertText} />
        <Loader></Loader>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  alertText: state.ui.alertText,
});

export const Picture = connect(mapStateToProps)(BasePicture);
