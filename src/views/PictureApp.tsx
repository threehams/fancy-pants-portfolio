import * as React from 'react';
import { connect } from 'react-redux';
import CssModules = require('react-css-modules');
import { Link } from 'react-router';

import { Alert, Loader, Panel } from '../components';
import { Picture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';

const styles = require('./PictureApp.scss');

interface PhotoProps {
  alertText?: string;
  fetchPictures: Function;
  picture: Picture;
  params: {
    pictureId: string;
  };
}

export class BasePictureApp extends React.Component<PhotoProps, {}> {
  public componentDidMount() {
    this.props.fetchPictures();
  }

  public render() {
    const {
      alertText,
      picture,
    } = this.props;

    if (!picture) {
      return <Loader></Loader>;
    }
    return (
      <div>
        <Link to="/" styleName="close-button">
          <div>&times;</div>
        </Link>
        <Alert type="error" text={alertText} />
        <Panel>
          <img width={picture.width} height={picture.height} styleName="image-fullscreen" src={picture.url} />
        </Panel>
        <Panel>
          <div>
            <h2>{ picture.title }</h2>
            {picture.description}
          </div>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = (state: State, props: PhotoProps) => {
  return {
    alertText: state.ui.alertText,
    picture: state.pictures.find(picture => picture.id === props.params.pictureId),
  };
};

export const PictureApp = connect(mapStateToProps, pictureActions)(CssModules(BasePictureApp, styles));
