import { Action, handleActions } from 'redux-actions';

import { Ui } from '../models';

const INITIAL_STATE: Ui = new Ui();

export const uiReducer = handleActions({
  DEFAULT: (state: Ui, action: Action<{}>) => {
    return state;
  },
}, INITIAL_STATE);
