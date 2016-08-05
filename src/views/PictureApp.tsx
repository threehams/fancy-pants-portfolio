import * as React from 'react';
import { connect } from 'react-redux';
import CssModules = require('react-css-modules');
import { Link } from 'react-router';
import Grid = require('react-bootstrap/lib/Grid');

import { Alert, Loader, Card, TransitionPicture } from '../components';
import { Picture, SourcePicture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';
import styles = require('./PictureApp.scss');

interface PhotoProps {
  alertText?: string;
  fetchPictures: Function;
  picture: Picture;
  sourcePicture: SourcePicture;
  params: {
    pictureId: string;
  };
}

interface PhotoState {
  animationPhase: string | null;
  showExpand?: boolean;
  showFinal?: boolean;
}

export class BasePictureApp extends React.Component<PhotoProps, PhotoState> {
  private targetElement: HTMLImageElement;
  private containerElement: HTMLElement;
  public constructor(props: PhotoProps, state: PhotoState) {
    super();
    this.state = {
      animationPhase: null,
      showExpand: false,
      showFinal: false,
    };
  }

  public componentDidMount() {
    this.props.fetchPictures();
    this.setAnimationPhase();
  }

  public componentDidUpdate() {
    this.setAnimationPhase();
  }

  public render() {
    const { alertText, sourcePicture, picture } = this.props;
    const { animationPhase } = this.state;

    if (!picture) {
      return <Loader></Loader>;
    }

    return (
      <div>
        <div styleName="container" ref={(element) => { this.containerElement = element; }}>
          <Link to="/" className="material-icons" styleName="close-button">cancel</Link>
          <Alert type="error" text={alertText} />
          <Card>
            { this.renderPicture(picture, animationPhase) }
          </Card>
          <Card>
            <div>
              <h2>{picture.title}</h2>
              {picture.description}
            </div>
          </Card>
          {
            sourcePicture && <TransitionPicture
              container={this.containerElement}
              crossfadeDuration={50}
              moveDuration={120}
              picture={picture}
              source={sourcePicture}
              target={this.targetElement}
              phase={animationPhase}
            />
          }

        </div>
      </div>
    );
  }

  private renderPicture(picture: Picture, animationPhase: string) {
    const { showFinal } = this.state;

    const dynamicStyles = {
      maxWidth: picture.width,
      opacity: showFinal ? 1 : 0.01,
      transition: 'opacity 50ms linear',
    };
    return (
      <div styleName="backdrop">
        <div styleName="fullscreen" style={dynamicStyles}>
          <div styleName="force-ratio" style={{ paddingTop: `${picture.height / picture.width * 100}%` }} />
          <div styleName="content">
            <img
              ref={(element) => { this.targetElement = element; } }
              src={picture.url}
              styleName="image"
            />
          </div>
        </div>
      </div>
    );
  }

  private setAnimationPhase() {
    if (!this.props.picture || this.state.animationPhase) {
      return;
    }
    this.setState({ animationPhase: 'start' });
    setTimeout(() => {
      this.setState({ animationPhase: 'startActive' });
      // setTimeout(() => {
      //   this.setState({ animationPhase: 'done' });
      // }, 500);
    });
  }
}

const mapStateToProps = (state: State, props: PhotoProps) => {
  return {
    alertText: state.ui.alertText,
    picture: state.pictures.pictures.find(picture => picture.id === props.params.pictureId),
    sourcePicture: state.pictures.sourcePicture,
  };
};

export const PictureApp = connect(mapStateToProps, pictureActions)(CssModules(BasePictureApp, styles));
