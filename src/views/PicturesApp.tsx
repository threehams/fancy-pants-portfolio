import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import Radium = require('radium');
import { Link } from 'react-router';

import { Alert, Loader, GridList, GridItem } from '../components';
import { Picture, SourcePicture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';
import shadows from '../styles/shadows';
import imageStyles from '../styles/images';

interface PicturesAppProps {
  alertText?: string;
  fetchPictures: Function;
  pictures: List<Picture>;
  openPicture: pictureActions.OpenPictureFunction;
}

@Radium
export class BasePicturesApp extends React.Component<PicturesAppProps, {}> {
  public componentDidMount() {
    this.props.fetchPictures();
  }

  public render() {
    const {
      alertText,
      children,
      pictures,
    } = this.props;

    return (
      <div>
        <section style={styles.background}>
          <Alert text={alertText} />
          <Loader showUntil={!!pictures.size}>
            <header style={styles.banner}>
              <picture>
                <source srcSet="http://d70l5b62xvcqq.cloudfront.net/banner.png" media="(max-width: 767px)" />
                <source srcSet="http://d70l5b62xvcqq.cloudfront.net/banner_wide.png" media="(min-width: 768px)" />
                <img style={styles.banner} src="http://d70l5b62xvcqq.cloudfront.net/banner.png" />
              </picture>
              <div style={[styles.banner, styles.bannerScrim]} />
              <div style={styles.contactDetails}>
                <h1>Vanessa Zuloaga</h1>
                <h2>Artist Person</h2>
                <ul>
                  <li style={styles.inlineListItem}>Sherman Oaks, CA</li><span style={styles.divider}>|</span>
                  <li style={styles.inlineListItem}>Resume</li><span style={styles.divider}>|</span>
                  <li style={styles.inlineListItem}>Twitter</li><span style={styles.divider}>|</span>
                  <li style={styles.inlineListItem}>Tumblr</li><span style={styles.divider}>|</span>
                  <li style={styles.inlineListItem}>Twitch</li>
                </ul>
              </div>
            </header>
            <GridList minWidth={156} maxWidth={240} spacing={4}>
              { pictures.map(this.renderTile.bind(this)) }
            </GridList>
            <p>© me</p>
          </Loader>
        </section>
        <section style={styles.detailView}>
          { children }
        </section>
      </div>
    );
  }

  private openPicture = (event: any, id: string) => {
    const rect = event.target.getBoundingClientRect();
    const dimensions = { height: event.target.clientHeight, width: event.target.clientWidth };
    const position = { x: rect.left, y: rect.top };
    this.props.openPicture(new SourcePicture({ id, position, dimensions }));
  }

  private renderTile(picture: Picture) {
    return (
      <Link
        key={picture.id}
        to={`/pictures/${picture.id}`}
        style={{ color: 'inherit' }}
        onClick={(event) => this.openPicture(event, picture.id)}
      >
        <GridItem heading={picture.title} backgroundColor={picture.backgroundColor}>
          <img src={picture.thumbnailUrl} style={imageStyles.fluid} />
        </GridItem>
      </Link>
    );
  }
}

const mapStateToProps = (state: State) => ({
  alertText: state.ui.alertText,
  pictures: state.pictures.pictures,
});

export const PicturesApp = connect(mapStateToProps, pictureActions)(BasePicturesApp);

const styles = {
  background: {
    padding: 10,
    '@media (min-width: 768px)': {
      padding: 15,
    },
  },
  banner: {
    position: 'relative',
    width: '100%',
  },
  bannerScrim: {
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0,0,0,0) 50%)',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  contactDetails: {
    bottom: 0,
    color: 'white',
    left: '50%',
    position: 'absolute',
    textShadow: shadows[1],
    transform: 'translateX(-50%)',
    zIndex: 2,
  },
  detailView: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
  },
  divider: {
    margin: '0 5px',
    opacity: 0.5,
  },
  inlineListItem: {
    display: 'inline-block',
  },
  thumbnail: {
    width: '100%',
  },
};
