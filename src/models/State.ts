import { Record } from 'immutable';
import { Ui, PictureState } from './';

interface StateProps {
  pictures?: PictureState;
  ui?: Ui;
}

export class State extends Record<StateProps>({
  pictures: undefined,
  ui: undefined,
}) implements StateProps {
  public pictures: PictureState;
  public ui: Ui;
};
