import { Action } from 'redux-actions';
import { uiReducer, picturesReducer } from './reducers';
import { State } from './models';

const INITIAL_STATE: State = new State();

export const rootReducer = (state = INITIAL_STATE, action: Action<any>): State => {
  return state.merge({
    ui: uiReducer(state.ui, action),
    pictures: picturesReducer(state.pictures, action),
  });
};
