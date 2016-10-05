import * as React from 'react';
import Radium = require('radium');

import { DetailPicture } from './';
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
  target: HTMLDivElement;
}

@Radium
export class TransitionPicture extends React.Component<TransitionPictureProps, {}> {
  public render() {
    const { children, crossfadeDuration, moveDuration, phase, picture, source, target, container } = this.props;
    if (!source || !target) {
      return this.renderDetailPicture(picture, children, styles.detailContainer);
    }

    const targetImage = this.getImageBoundaries(picture, target);

    // TODO move calculations somewhere else
    // TODO the offset here should be simpler...
    const containerRect = container.getBoundingClientRect();
    const offsetLeft = containerRect.left;
    const offsetTop = containerRect.top;
    const targetScale = targetImage.width / picture.width;
    const targetLeft = targetImage.left - offsetLeft;
    const targetTop = targetImage.top - offsetTop;

    const startLeft = source.position.x - offsetLeft;
    const startTop = source.position.y - offsetTop;
    const expandStartLeft = picture.thumbnailLeft * targetScale + targetLeft - offsetLeft;
    const expandStartTop = picture.thumbnailTop * targetScale + targetTop - offsetTop;
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
        transform: `translate(${expandStartLeft + offsetLeft}px, ${expandStartTop + offsetTop}px)`,
        zIndex: 102,
      },
      start: {
        opacity: 1,
        transform: `translate(${startLeft}px, ${startTop}px)`,
      },
      startActive: {
        opacity: 0,
        transform: `translate(${expandStartLeft + offsetLeft}px, ${expandStartTop + offsetTop}px)`,
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
      default: Object.assign({}, {
        backgroundPosition: `${targetLeft + offsetLeft}px ${targetTop + offsetTop}px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: expandEndWidth,
      }, styles.detailContainer),
      start: {
        height: expandStartHeight,
        left: `${expandStartLeft + offsetLeft}px`,
        opacity: 0,
        top: `${expandStartTop + offsetTop}px`,
        width: expandStartWidth,
      },
      startActive: {
        backgroundColor: 'black',
        backgroundImage: `url(${picture.sources.first().url})`,
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
        { this.renderDetailPicture(
          picture,
          children,
          Object.assign({}, expandStyles.default, expandStyles[phase]),
          Object.assign({}, finalStyles.default, finalStyles[phase]),
        ) }
        <div style={Object.assign({}, containerStyles.default, containerStyles[phase])}>
          <img
            src={picture.thumbnailUrl}
            style={[imageStyles.fluid, thumbnailStyles[phase] || thumbnailStyles.default]}
          />
        </div>
      </div>
    );
  }

  private renderDetailPicture(picture, children, containerStyles?, imageStyles?) {
    return <DetailPicture
      picture={picture}
      containerStyles={containerStyles}
      imageStyles={imageStyles}
    >
      { children }
    </DetailPicture>;
  }

  private getImageBoundaries(picture: Picture, target: HTMLDivElement): { width: number, left: number, top: number } {
    const aspectRatio = picture.width / picture.height;
    const targetRect = target.getBoundingClientRect();
    const targetRatio = targetRect.width / targetRect.height;
    const scale = aspectRatio > targetRatio ? targetRect.width / picture.width : targetRect.height / picture.height;
    const width = Math.floor(picture.width * scale);

    return {
      left: (targetRect.width - width) / 2 + targetRect.left,
      top: targetRect.top,
      width,
    };
  }
};

const styles = {
  detailContainer: {
    backgroundAttachment: 'fixed',
    backgroundColor: 'black',
    backgroundImage: 'none',
    height: 'auto',
    left: 0,
    opacity: 1,
    position: 'relative',
    top: 0,
    width: '100%',
    zIndex: 101,
  },
};
