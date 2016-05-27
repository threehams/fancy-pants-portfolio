import { Map } from 'immutable';
import { SET_STATE } from '../actions/actionTypes';

export const INITIAL_STATE = Map();

export default function locationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_STATE:
      return action.payload.location;
    default:
      return state;
  }
}
