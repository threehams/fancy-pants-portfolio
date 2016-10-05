import * as React from 'react';
import Radium = require('radium');

import { Card } from '../components';
import { Picture } from '../models';

interface DetailPictureProps {
  containerStyles?: Object;
  imageStyles?: Object;
  picture: Picture;
}

@Radium
export class DetailPicture extends React.Component<DetailPictureProps, {}> {
  public render() {
    const { children, containerStyles, imageStyles, picture } = this.props;
    const backgroundImages = picture.sources.reduce((images: any, source, i) => {
      if (i === 0) {
        images.backgroundImage = `url(${source.url})`;
      } else {
        images[`@media (min-width: ${source.width}px)`] = {
          backgroundImage: `url(${source.url})`,
        };
      }
      return images;
    }, {});
    return (
      <Card style={containerStyles}>
        <div style={[styles.fullscreen]}>
          <div style={[styles.forceRatio, { paddingTop: `${picture.height / picture.width * 100}%` }]} />
          <div style={[styles.content, backgroundImages, imageStyles]} />
        </div>
        { children }
      </Card>
    );
  }
}

const styles = {
  content: {
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
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
};
