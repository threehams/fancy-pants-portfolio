import { PictureState } from '../models';
import { ClosePicture, OpenPicture, ReceivePicturesSuccess } from '../actions/pictureActions';

type Actions = ReceivePicturesSuccess | OpenPicture | ClosePicture;

const INITIAL_STATE = new PictureState;

export const picturesReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case 'RECEIVE_PICTURES_SUCCESS':
      return state.set('pictures', action.payload.pictures);
    case 'OPEN_PICTURE':
      return state.set('sourcePicture', action.payload.source);
    case 'CLOSE_PICTURE':
      return state.set('sourcePicture', action.payload.source);
    default:
      return state;
  }
};
