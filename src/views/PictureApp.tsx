import * as React from 'react';
import { connect } from 'react-redux';
import Radium = require('radium');
import { Link } from 'react-router';

import { Alert, Loader, GridList, GridItem, TransitionPicture } from '../components';
import { Picture, SourcePicture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';
import shadows from '../styles/shadows';
import imageStyles from '../styles/images';

const CROSSFADE_DURATION = 20;
const MOVE_DURATION = 160;

interface PictureAppProps {
  alertText?: string;
  picture: Picture;
  sourcePicture: SourcePicture;
  params: {
    pictureId: string;
  };
}

interface PictureAppState {
  animationPhase: string | null;
}

@Radium
export class BasePictureApp extends React.Component<PictureAppProps, PictureAppState> {
  private targetElement: HTMLImageElement;
  private containerElement: HTMLElement;
  public constructor(props: PictureAppProps, state: PictureAppState) {
    super();
    this.state = {
      animationPhase: null,
    };
  }

  public componentDidMount() {
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

    const spotlightStyles = {
      default: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
      start: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
      },
      startActive: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        transition: '150ms all linear',
      },
    };

    return (
      <div>
        <div style={styles.container} ref={(element) => { this.containerElement = element; }}>
          <Link to="/" className="material-icons" style={styles.closeButton}>close</Link>
          <Alert type="error" text={alertText} />
          { this.renderImageGuide(picture, animationPhase) }
          {
            <TransitionPicture
              container={this.containerElement}
              crossfadeDuration={CROSSFADE_DURATION}
              moveDuration={MOVE_DURATION}
              picture={picture}
              source={sourcePicture}
              target={this.targetElement}
              phase={animationPhase}
            >
              <h2>{ picture.title }</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit fugiat nostrum sed, iure quam
                ex aut mollitia, quae quasi at alias temporibus rerum totam eum? Necessitatibus velit ab, quia
                consectetur id incidunt quod dolorum enim nam ipsum voluptate, veniam delectus officia temporibus
                quaerat earum nihil, possimus fugiat? Accusamus, eum, quaerat?
              </p>
              <GridList minWidth={160} maxWidth={240} spacing={4}>
                <GridItem backgroundColor="#ffffff">
                  <img
                    height={300}
                    src={picture.thumbnailUrl}
                    style={imageStyles.fluid}
                    width={300}
                  />
                </GridItem>
              </GridList>
            </TransitionPicture>
          }
        </div>
        <div style={[styles.spotlight, spotlightStyles.default, spotlightStyles[animationPhase]]} />
      </div>
    );
  }

  private renderImageGuide(picture: Picture, animationPhase: string) {
    return (
      <div style={[styles.fullscreen, styles.imageGuide]}>
        <div style={[styles.forceRatio, { paddingTop: `${picture.height / picture.width * 100}%` }]} />
        <div style={styles.content}>
          <img
            ref={(element) => { this.targetElement = element; } }
            src={picture.placeholderSrc}
            style={styles.image}
          />
        </div>
      </div>
    );
  }

  private setAnimationPhase() {
    const { picture } = this.props;
    const { animationPhase } = this.state;

    if (!picture || animationPhase) {
      return;
    }
    this.setState({ animationPhase: 'start' });
    setTimeout(() => {
      this.setState({ animationPhase: 'startActive' });
      setTimeout(() => {
        this.setState({ animationPhase: 'done' });
      }, (CROSSFADE_DURATION * 2) + (MOVE_DURATION * 2));
    });
  }
}

const mapStateToProps = (state: State, props: PictureAppProps) => {
  return {
    alertText: state.ui.alertText,
    picture: state.pictures.pictures.find(picture => picture.id === props.params.pictureId),
    sourcePicture: state.pictures.sourcePicture,
  };
};

export const PictureApp = connect(mapStateToProps, pictureActions)(BasePictureApp);

const styles = {
  closeButton: {
    color: 'white',
    fontSize: 48,
    position: 'absolute',
    right: 20,
    textShadow: shadows[1],
    top: 20,
    zIndex: 105,
    ':hover': {
      color: '#ccc',
      textDecoration: 'none',
    },
    ':active': {
      color: '#ccc',
      textDecoration: 'none',
    },
    ':link': {
      textDecoration: 'none',
    },
    ':visited': {
      textDecoration: 'none',
    },
  },
  container: {
    margin: 15,
    padding: 0,
    position: 'relative',
  },
  content: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  forceRatio: {
    display: 'block',
    overflow: 'hidden',
  },
  fullscreen: {
    margin: '0 auto',
    maxHeight: '90vh',
    position: 'relative',
  },
  image: {
    display: 'block',
    height: '90vh',
    margin: '0 auto',
  },
  imageGuide: {
    left: 0,
    margin: '0 auto',
    position: 'absolute',
    right: 0,
    top: 0,
    visibility: 'hidden',
  },
  spotlight: {
    height: '100vh',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100%',
  },
};
