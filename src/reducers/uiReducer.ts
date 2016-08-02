import { Ui } from '../models';

type Actions = any;

const INITIAL_STATE: Ui = new Ui();

export const uiReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    default:
      return state;
  }
};
