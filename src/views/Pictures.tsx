import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import { Alert, Loader, Panel } from '../components';
import { Picture, State } from '../models';
import * as pictureActions from '../actions/pictureActions';

interface PhotosProps {
  alertText?: string;
  fetchPictures: Function;
  pictures: List<Picture>;
}

export class BasePictures extends React.Component<PhotosProps, {}> {
  public componentDidMount() {
    this.props.fetchPictures();
  }

  public render() {
    const {
      alertText,
      pictures,
    } = this.props;

    return (
      <div>
        <Alert text={alertText} />
        <Loader showUntil={!!pictures.size}>
          {
            pictures.map((picture) => {
              console.log(picture.title);
              return (
                <Panel key={picture.id} heading={picture.title}>
                  <img src={picture.url} />
                </Panel>
              );
            })
          }
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  alertText: state.ui.alertText,
  pictures: state.pictures,
});

export const Pictures = connect(mapStateToProps, pictureActions)(BasePictures);
