import {OrderedSet, Map} from 'immutable';

import UiRecord from '../records/UiRecord';
import {
  SET_STATE,
} from '../actions/actionTypes';

export const INITIAL_STATE = new UiRecord();

export default function uiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_STATE:
      return setState(state, action);
    default:
      return state;
  }
}

function setState(state, action) {
  return state;
}
