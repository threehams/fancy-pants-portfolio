import * as React from 'react';
import { connect } from 'react-redux';
import Radium = require('radium');

import { State } from '../../models';

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
