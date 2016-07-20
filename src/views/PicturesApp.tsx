import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import CssModules = require('react-css-modules');
import { Link } from 'react-router';

import Row = require('react-bootstrap/lib/Row');
import Col = require('react-bootstrap/lib/Col');
import Grid = require('react-bootstrap/lib/Grid');
import { Alert, Loader, Panel } from '../components';
import { Picture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';

const styles = require('./PicturesApp.scss');

const GRID_SETTINGS = {
  '1': {
    sm: 3,
    xs: 6,
  },
  '2': {
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
                <Panel heading="Heading">
                  <img className="img-fluid"
                      width={1900}
                      height={600}
                      alt="1200x400"
                      src="https://placecage.com/1200/400"
                  />
                </Panel>
              </Col>
            </Row>
              { this.renderTiles() }
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

  private renderTiles() {
    const { pictures } = this.props;

    let rows = [];
    let currentRow = 0;
    let rowWidth = 0;
    pictures.forEach((picture) => {
      if (rowWidth + picture.thumbnailWidth <= 4) {
        rowWidth += picture.thumbnailWidth;
      } else {
        currentRow++;
        rowWidth = picture.thumbnailWidth;
      }
      rows[currentRow] = (rows[currentRow] || []).concat([picture]);
    });

    return rows.map((row, index) => {
      return (
        <Row key={index} className="no-gutter">
          { row.map(renderTile) }
        </Row>
      );
    });

    function renderTile(picture: Picture) {
      const gridProps = GRID_SETTINGS[picture.thumbnailWidth];
      const styleName = STYLE_NAMES[picture.thumbnailWidth];
      return (
        <Col key={picture.id} {...gridProps}>
          <Link to={`/pictures/${picture.id}`}>
            <Panel heading={picture.title}>
              <div styleName={styleName}>
                <div styleName="content" style={{backgroundImage: `url("${picture.thumbnailUrl}")`}} />
              </div>
            </Panel>
          </Link>
        </Col>
      );
    }
  }
}

const mapStateToProps = (state: State) => ({
  alertText: state.ui.alertText,
  pictures: state.pictures,
});

export const PicturesApp = connect(mapStateToProps, pictureActions)(CssModules(BasePicturesApp, styles));
