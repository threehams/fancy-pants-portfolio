import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import CssModules = require('react-css-modules');
import { Link } from 'react-router';
import Row = require('react-bootstrap/lib/Row');
import Col = require('react-bootstrap/lib/Col');
import Grid = require('react-bootstrap/lib/Grid');

import { Alert, Loader, Card } from '../components';
import { Picture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';
import styles = require('./PicturesApp.scss');

const GRID_SETTINGS = {
  '1': {
    lg: 2,
    sm: 3,
    xs: 6,
  },
  '2': {
    lg: 4,
    sm: 6,
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
      pictures,
    } = this.props;
    return (
      <div styleName="background">
        <Alert text={alertText} />
        <Loader showUntil={!!pictures.size}>
          <Grid fluid className="main">
            <Row className="no-gutter">
              <Col xs={12}>
                <Card heading="Heading">
                  <img className="img-fluid"
                      width={1900}
                      height={600}
                      alt="1200x400"
                      src="https://placecage.com/1200/400"
                  />
                </Card>
              </Col>
            </Row>
            <Row className="no-gutter">
              { pictures.map(this.renderTile) }
            </Row>
            <Row>
              <Col xs={12}>
                <p className="copy-dark">© me</p>
              </Col>
            </Row>
          </Grid>
        </Loader>
      </div>
    );
  }

  private renderTile(picture: Picture) {
    const gridProps = GRID_SETTINGS[picture.thumbnailWidth];
    const styleName = STYLE_NAMES[picture.thumbnailWidth];
    return (
      <Col key={picture.id} {...gridProps}>
        <Link to={`/pictures/${picture.id}`}>
          <Card heading={picture.title}>
            <div styleName={styleName}>
              <div styleName="content" style={{backgroundImage: `url("${picture.thumbnailUrl}")`}} />
            </div>
          </Card>
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
