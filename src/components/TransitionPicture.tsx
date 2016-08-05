import * as React from 'react';
import CssModules = require('react-css-modules');

import { Card } from '../components';
import { Picture, SourcePicture } from '../models';
import styles = require('./TransitionPicture.scss');

interface TransitionPictureProps {
  container: HTMLElement;
  crossfadeDuration: number;
  moveDuration: number;
  phase: string;
  picture: Picture;
  source: SourcePicture;
  target: HTMLImageElement;
}

export class TransitionPictureBase extends React.Component<TransitionPictureProps, {}> {
  public render() {
    const { crossfadeDuration, moveDuration, phase, picture, source, target, container } = this.props;
    if (!source || !target) {
      return <div></div>;
    }
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
        transform: `translate(${expandStartX}px, ${expandStartY}px)`,
      },
      start: {
        opacity: 1,
        transform: `translate(${startX}px, ${startY}px)`,
      },
      startActive: {
        // opacity: 0,
        transform: `translate(${expandStartX + offsetX}px, ${expandStartY + offsetY}px)`,
        transition: `${moveDuration}ms transform ease-in-out, ${crossfadeDuration}ms opacity linear ${moveDuration + crossfadeDuration}ms`,
      },
    };

    const imageStyles = {
      default: {
        width: expandStartWidth,
      },
      start: {
        width: source.dimensions.width,
      },
      startActive: {
        transition: `${moveDuration}ms all ease-in-out`,
        width: expandStartWidth,
      },
    };

    const expandStyles = {
      default: {
        backgroundAttachment: 'fixed',
        backgroundColor: 'black',
        backgroundImage: `url(${picture.url})`,
        backgroundPosition: `${targetX + offsetX}px ${targetY + offsetY}px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: expandEndWidth,
        height: expandEndHeight,
        left: 0,
        opacity: 0,
        top: 0,
        width: '100%',
      },
      start: {
        height: expandStartHeight,
        left: `${expandStartX}px`,
        opacity: 0,
        top: `${expandStartY}px`,
        width: expandStartWidth,
      },
      startActive: {
        height: expandEndHeight,
        left: 0,
        opacity: 1,
        top: 0,
        transition: `${moveDuration}ms all ease-in-out ${moveDuration + crossfadeDuration}ms, ${crossfadeDuration}ms opacity linear ${moveDuration}ms`,
        width: '100%',
      },
    };

    return (
      <div>
        <div
          styleName="transition-picture"
          style={Object.assign({}, containerStyles.default, containerStyles[phase])}
        >
          <img
            className="img-fluid"
            src={picture.thumbnailUrl}
            style={imageStyles[phase] || imageStyles.default}
          />
        </div>
        <div
          styleName="transition-picture-expand"
          style={Object.assign({}, expandStyles.default, expandStyles[phase])}
        />
      </div>
    );
  }
};

export const TransitionPicture = CssModules(TransitionPictureBase, styles);
