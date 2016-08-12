import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import Radium = require('radium');
import { Link } from 'react-router';
import Row = require('react-bootstrap/lib/Row');
import Col = require('react-bootstrap/lib/Col');
import Grid = require('react-bootstrap/lib/Grid');

import { State } from '../../models';
import styles = require('./AdminApp.scss');

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

interface AdminProps {

}

@Radium
export class BaseAdminApp extends React.Component<AdminProps, {}> {
  public render() {
    return (
      // <List>
      //   <ListItem>
          
      //   </ListItem>
      // </List>
      <div>
        <button>Upload</button>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  alertText: state.ui.alertText,
  pictures: state.pictures,
});

export const AdminApp = connect(mapStateToProps)(BaseAdminApp);
