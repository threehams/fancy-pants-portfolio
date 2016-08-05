import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import CssModules = require('react-css-modules');
import { Link } from 'react-router';
import Row = require('react-bootstrap/lib/Row');
import Col = require('react-bootstrap/lib/Col');
import Grid = require('react-bootstrap/lib/Grid');

import { Alert, Loader, GridList, GridItem } from '../components';
import { Picture, SourcePicture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';
import styles = require('./PicturesApp.scss');

interface PicturesProps {
  alertText?: string;
  fetchPictures: Function;
  pictures: List<Picture>;
  openPicture: pictureActions.OpenPictureFunction;
}

export class BasePicturesApp extends React.Component<PicturesProps, {}> {
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
      <div styleName="background">
        <Alert text={alertText} />
        <Loader showUntil={!!pictures.size}>
          <Grid fluid styleName="container">
            <Row className="no-gutter">
              <Col xs={12}>
                <div styleName="banner" style={{ backgroundImage: `url(/assets/banner.png)` }} />
                <div styleName="banner-scrim" />
                <div styleName="contact-details" className="text-xs-center">
                  <h1>Vanessa Zuloaga</h1>
                  <h2>Artist Person</h2>
                  <ul className="list-unstyled" styleName="list-divided">
                    <li>Sherman Oaks, CA</li>
                    <li>Resume</li>
                    <li>Twitter</li>
                    <li>Tumblr</li>
                    <li>Twitch</li>
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
        <div styleName="detail-view">
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
            <div styleName="thumbnail-square">
              <div styleName="content" style={{backgroundImage: `url("${picture.thumbnailUrl}")`}} />
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

export const PicturesApp = connect(mapStateToProps, pictureActions)(CssModules(BasePicturesApp, styles));
