import * as React from 'react';
import { connect } from 'react-redux';
import CssModules = require('react-css-modules');
import { Link } from 'react-router';
import Grid = require('react-bootstrap/lib/Grid');

import { Alert, Loader, Card } from '../components';
import { Picture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';
import styles = require('./PictureApp.scss');

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
      <div styleName="background">
        <Grid fluid styleName="container">
          <Link to="/" styleName="close-button">
            <div>&times;</div>
          </Link>
          <Alert type="error" text={alertText} />
          <Card>
            <div styleName="backdrop">
              <div styleName="fullscreen" style={{ maxWidth: picture.width }}>
                <div styleName="force-ratio" style={{ paddingTop: `${ picture.height / picture.width * 100 }%` }} />
                <div styleName="content">
                  <img src={ picture.url } styleName="image" />
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div>
              <h2>{picture.title}</h2>
              {picture.description}
            </div>
          </Card>
        </Grid>
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
