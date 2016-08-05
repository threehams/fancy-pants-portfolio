import * as React from 'react';
import { connect } from 'react-redux';
import CssModules = require('react-css-modules');
import { Link } from 'react-router';
import Grid = require('react-bootstrap/lib/Grid');

import { Alert, Loader, Card, TransitionPicture } from '../components';
import { Picture, SourcePicture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';
import styles = require('./PictureApp.scss');

const CROSSFADE_DURATION = 50;
const MOVE_DURATION = 120;

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
}

export class BasePictureApp extends React.Component<PhotoProps, PhotoState> {
  private targetElement: HTMLImageElement;
  private containerElement: HTMLElement;
  public constructor(props: PhotoProps, state: PhotoState) {
    super();
    this.state = {
      animationPhase: null,
      showExpand: false,
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
          { this.renderPicture(picture, animationPhase) }
          {
            sourcePicture && <TransitionPicture
              container={this.containerElement}
              crossfadeDuration={CROSSFADE_DURATION}
              moveDuration={MOVE_DURATION}
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
    return (
      <div styleName="image-guide">
        <div styleName="force-ratio" style={{ paddingTop: `${picture.height / picture.width * 100}%` }} />
        <div styleName="content">
          <img
            ref={(element) => { this.targetElement = element; } }
            src={picture.url}
            styleName="image"
          />
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
      setTimeout(() => {
        console.log('done');
        this.setState({ animationPhase: 'done' });
      }, (CROSSFADE_DURATION * 2) + (MOVE_DURATION * 2));
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
