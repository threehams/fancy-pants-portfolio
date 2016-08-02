import { uiReducer, picturesReducer } from './reducers';
import { State } from './models';

const INITIAL_STATE: State = new State();

export const rootReducer = (state = INITIAL_STATE, action: any): State => {
  return state.merge({
    pictures: picturesReducer(state.pictures, action),
    ui: uiReducer(state.ui, action),
  });
};
