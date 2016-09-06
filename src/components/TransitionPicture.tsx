import * as React from 'react';
import Radium = require('radium');

import { Card } from '../components';
import { Picture, SourcePicture } from '../models';
import imageStyles from '../styles/images';

const STANDARD_CURVE = 'cubic-bezier(0.4, 0.0, 0.2, 1)';

interface TransitionPictureProps {
  container: HTMLElement;
  crossfadeDuration: number;
  moveDuration: number;
  phase: string;
  picture: Picture;
  source: SourcePicture;
  target: HTMLImageElement;
}

@Radium
export class TransitionPicture extends React.Component<TransitionPictureProps, {}> {
  public render() {
    const { children, crossfadeDuration, moveDuration, phase, picture, source, target, container } = this.props;
    if (!source || !target) {
      return <div></div>;
    }

    // TODO move calculations somewhere else
    // TODO the offset here should be simpler...
    const containerRect = container.getBoundingClientRect();
    const offsetX = containerRect.left;
    const offsetY = containerRect.top;
    const targetScale = target.clientWidth / picture.width;
    const targetRect = target.getBoundingClientRect();
    const targetX = targetRect.left - offsetX;
    const targetY = targetRect.top - offsetY;

    const startX = source.position.x - offsetX;
    const startY = source.position.y - offsetY;
    const expandStartX = picture.thumbnailLeft * targetScale + targetX - offsetX;
    const expandStartY = picture.thumbnailTop * targetScale + targetY - offsetY;
    const expandEndHeight = picture.height * targetScale;
    const expandEndWidth = picture.width * targetScale;
    const expandStartHeight = picture.thumbnailHeight * targetScale;
    const expandStartWidth = picture.thumbnailWidth * targetScale;

    const containerStyles = {
      default: {
        left: 0,
        opacity: 0,
        position: 'absolute',
        top: 0,
        transform: `translate(${expandStartX + offsetX}px, ${expandStartY + offsetY}px)`,
        zIndex: 102,
      },
      start: {
        opacity: 1,
        transform: `translate(${startX}px, ${startY}px)`,
      },
      startActive: {
        opacity: 0,
        transform: `translate(${expandStartX + offsetX}px, ${expandStartY + offsetY}px)`,
        transition: `${moveDuration}ms transform ${STANDARD_CURVE},
          ${crossfadeDuration}ms opacity linear ${moveDuration + crossfadeDuration}ms`,
      },
    };

    const thumbnailStyles = {
      default: {
        width: expandStartWidth,
      },
      start: {
        width: source.dimensions.width,
      },
      startActive: {
        transition: `${moveDuration}ms all ${STANDARD_CURVE}`,
        width: expandStartWidth,
      },
    };

    const expandStyles = {
      default: {
        backgroundAttachment: 'fixed',
        backgroundColor: 'black',
        backgroundImage: 'none',
        backgroundPosition: `${targetX + offsetX}px ${targetY + offsetY}px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: expandEndWidth,
        height: 'auto',
        left: 0,
        opacity: 1,
        position: 'relative',
        top: 0,
        width: '100%',
        zIndex: 101,
      },
      start: {
        height: expandStartHeight,
        left: `${expandStartX + offsetX}px`,
        opacity: 0,
        top: `${expandStartY + offsetY}px`,
        width: expandStartWidth,
      },
      startActive: {
        backgroundColor: 'black',
        backgroundImage: `url(${picture.sources.last().url})`,
        height: expandEndHeight,
        left: 0,
        opacity: 1,
        top: 0,
        transition: `${moveDuration}ms all ${STANDARD_CURVE} ${moveDuration + crossfadeDuration}ms,
          ${crossfadeDuration}ms opacity linear ${moveDuration}ms`,
          // ${moveDuration}ms height ${STANDARD_CURVE} ${moveDuration + crossfadeDuration + moveDuration * 0.25}ms,
        width: '100%',
      },
    };

    const finalStyles = {
      default: {
        opacity: 1,
      },
      start: {
        opacity: 0,
      },
      startActive: {
        opacity: 1,
        transition: `${crossfadeDuration}ms opacity linear ${moveDuration * 2 + crossfadeDuration}ms`,
      },
    };

    return (
      <div>
        <DetailPicture
          picture={picture}
          containerStyles={Object.assign({}, expandStyles.default, expandStyles[phase])}
          imageStyles={Object.assign({}, finalStyles.default, finalStyles[phase])}
        >
          { children }
        </DetailPicture>
        <div style={Object.assign({}, containerStyles.default, containerStyles[phase])}>
          <img
            src={picture.thumbnailUrl}
            style={[imageStyles.fluid, thumbnailStyles[phase] || thumbnailStyles.default]}
          />
        </div>
      </div>
    );
  }
};

interface DetailPictureProps {
  containerStyles: Object;
  imageStyles: Object;
  picture: Picture;
}

@Radium
class DetailPicture extends React.Component<DetailPictureProps, {}> {
  public render() {
    const { children, containerStyles, imageStyles, picture } = this.props;
    return (
      <Card style={containerStyles}>
        <div style={[styles.fullscreen, {maxWidth: picture.width}]}>
          <div style={[styles.forceRatio, { paddingTop: `${picture.height / picture.width * 100}%` }]} />
          <div style={styles.content}>
            <picture>
              { picture.sources.map((source, i) => {
                return (<source key={i} srcSet={source.url} media={`(min-width: ${source.width}px)`} />); }) }
              <img
                style={[styles.image, imageStyles]}
                src={picture.sources.get(0).url}
              />
            </picture>
          </div>
        </div>
        { children }
      </Card>
    );
  }
}

const styles = {
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
    maxWidth: '100%',
  },
};
