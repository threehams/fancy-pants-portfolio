import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import CssModules = require('react-css-modules');
import { Link } from 'react-router';
import Row = require('react-bootstrap/lib/Row');
import Col = require('react-bootstrap/lib/Col');
import Grid = require('react-bootstrap/lib/Grid');

import { Alert, Loader, GridList, GridItem } from '../components';
import { Picture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';
import styles = require('./PicturesApp.scss');

const GRID_SETTINGS = {
  '1': {
    lg: 2,
    md: 3,
    sm: 4,
    xl: 2,
    xs: 6,
  },
  '2': {
    lg: 4,
    md: 4,
    sm: 6,
    xl: 3,
    xs: 12,
  },
};

const STYLE_NAMES = {
  '1': 'thumbnail-square',
  '2': 'thumbnail-wide',
};

interface PicturesProps {
  alertText?: string;
  fetchPictures: Function;
  pictures: List<Picture>;
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
                <h1>Vanessa Zuloaga</h1>
              </Col>
            </Row>
            <GridList>
              <Row className="grid-list">
                { pictures.map(this.renderTile) }
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

  private renderTile(picture: Picture) {
    const gridProps = GRID_SETTINGS[picture.thumbnailWidth];
    const styleName = STYLE_NAMES[picture.thumbnailWidth];
    return (
      <Col key={picture.id} {...gridProps}>
        <Link to={`/pictures/${picture.id}`} className="link-unstyled">
          <GridItem heading={picture.title} backgroundColor={picture.backgroundColor}>
            <div styleName={styleName}>
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
  pictures: state.pictures,
});

export const PicturesApp = connect(mapStateToProps, pictureActions)(CssModules(BasePicturesApp, styles));
