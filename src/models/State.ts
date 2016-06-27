import { List, Record } from 'immutable';
import { Ui, Picture } from './';

interface StateProps {
  pictures?: List<Picture>;
  ui?: Ui;
}

export class State extends Record<StateProps>({
  pictures: undefined,
  ui: undefined,
}) implements StateProps {
  public pictures: List<Picture>;
  public ui: Ui;
};
