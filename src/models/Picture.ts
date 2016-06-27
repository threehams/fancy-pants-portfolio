import { Record } from 'immutable';

interface PictureProps {
  description: string;
  id: string;
  title: string;
  url: string;
}

export class Picture extends Record<PictureProps>({
  description: '',
  id: null,
  title: '',
  url: '',
}) implements PictureProps {
  public description: string;
  public id: string;
  public title: string;
  public url: string;
};
