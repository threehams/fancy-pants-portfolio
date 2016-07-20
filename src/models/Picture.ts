import { Record } from 'immutable';

interface PictureProps {
  description: string;
  height: number;
  id: string;
  thumbnailUrl: string;
  thumbnailWidth: number;
  title: string;
  url: string;
  width: number;
}

export class Picture extends Record<PictureProps>({
  description: '',
  height: 0,
  id: '',
  thumbnailUrl: '',
  thumbnailWidth: 0,
  title: '',
  url: '',
  width: 1,
}) implements PictureProps {
  public description: string;
  public height: number;
  public id: string;
  public thumbnailUrl: string;
  public thumbnailWidth: number;
  public title: string;
  public url: string;
  public width: number;
};
