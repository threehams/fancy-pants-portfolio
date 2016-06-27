import { List } from 'immutable';
import { Action, handleActions } from 'redux-actions';

import { Picture } from '../models';
import { RECEIVE_PICTURES_SUCCESS } from '../actions/pictureActions';

type PictureState = List<Picture>;
const INITIAL_STATE: PictureState = List([]);

export const picturesReducer = handleActions({
  DEFAULT: (state: PictureState, action: Action<{}>) => {
    return state;
  },
  [RECEIVE_PICTURES_SUCCESS]: (state: PictureState, action: Action<RECEIVE_PICTURES_SUCCESS>) => {
    return action.payload.pictures;
  },
}, INITIAL_STATE);
