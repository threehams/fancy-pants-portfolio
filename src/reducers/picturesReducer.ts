import { PictureState } from '../models';
import { ClosePicture, OpenPicture, SetState } from '../actions/pictureActions';

type Actions = SetState | OpenPicture | ClosePicture;

const INITIAL_STATE = new PictureState();

export const picturesReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case 'CLOSE_PICTURE':
      return state.set('sourcePicture', action.payload.source);
    case 'OPEN_PICTURE':
      return state.set('sourcePicture', action.payload.source);
    case 'SET_STATE':
      return state.set('pictures', action.payload.pictures)
      .set('banner', action.payload.banner);
    default:
      return state;
  }
};
