import { Record } from 'immutable';

interface UiProps {
  alertText?: string;
}

export class Ui extends Record<UiProps>({
  alertText: '',
}) implements UiProps {
  public alertText: string;
};
