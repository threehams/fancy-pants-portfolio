import { List } from 'immutable';

import { Picture } from '../models';
import { ReceivePicturesSuccess } from '../actions/pictureActions';

type Actions = ReceivePicturesSuccess;
type PictureState = List<Picture>;

const INITIAL_STATE: PictureState = List([]);

export const picturesReducer = (state = INITIAL_STATE, action: ReceivePicturesSuccess) => {
  switch (action.type) {
    case 'RECEIVE_PICTURES_SUCCESS':
      return action.payload.pictures;
    default:
      return state;
  }
};
