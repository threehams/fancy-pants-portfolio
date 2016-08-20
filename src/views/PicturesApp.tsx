import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import Radium = require('radium');
import { Link } from 'react-router';
import Row = require('react-bootstrap/lib/Row');
import Col = require('react-bootstrap/lib/Col');
import Grid = require('react-bootstrap/lib/Grid');

import { Alert, Loader, GridList, GridItem } from '../components';
import { Picture, SourcePicture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';
import shadows from '../styles/shadows';

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
      <div style={styles.background}>
        <Alert text={alertText} />
        <Loader showUntil={!!pictures.size}>
          <Grid fluid>
            <Row className="no-gutter">
              <Col xs={12}>
                <div style={
                  [styles.banner, { backgroundImage: `url(http://d70l5b62xvcqq.cloudfront.net/banner.png)` }]
                } />
                <div style={[styles.banner, styles.bannerScrim]} />
                <div style={styles.contactDetails} className="text-xs-center">
                  <h1>Vanessa Zuloaga</h1>
                  <h2>Artist Person</h2>
                  <ul className="list-unstyled">
                    <li style={styles.inlineListItem}>Sherman Oaks, CA</li><span style={styles.divider}>|</span>
                    <li style={styles.inlineListItem}>Resume</li><span style={styles.divider}>|</span>
                    <li style={styles.inlineListItem}>Twitter</li><span style={styles.divider}>|</span>
                    <li style={styles.inlineListItem}>Tumblr</li><span style={styles.divider}>|</span>
                    <li style={styles.inlineListItem}>Twitch</li>
                  </ul>
                </div>
              </Col>
            </Row>
            <GridList>
              <Row className="grid-list">
                { pictures.map(this.renderTile.bind(this)) }
              </Row>
            </GridList>
            <Row>
              <Col xs={12}>
                <p className="copy-dark">© me</p>
              </Col>
            </Row>
          </Grid>
        </Loader>
        <div style={styles.detailView}>
          { children }
        </div>
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
    const gridProps = {
      lg: 2,
      md: 3,
      sm: 4,
      xs: 6,
    };
    return (
      <Col key={picture.id} {...gridProps}>
        <Link
          to={`/pictures/${picture.id}`}
          className="link-unstyled"
          onClick={(event) => this.openPicture(event, picture.id)}
        >
          <GridItem heading={picture.title} backgroundColor={picture.backgroundColor}>
            <div style={styles.thumbnail}>
              <div style={styles.thumbnailBefore} />
              <div style={[styles.thumbnailContent, { backgroundImage: `url("${picture.thumbnailUrl}")` }]} />
              </div>
          </GridItem>
        </Link>
      </Col>
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
    paddingTop: 20,
  },
  banner: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    paddingTop: '50%',
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
    paddingTop: '100%',
    position: 'relative',
  },
  thumbnailBefore: {
    display: 'block',
    width: '100%',
  },
  thumbnailContent: {
    backgroundSize: 'cover',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
};
