import { Record } from 'immutable';

interface PictureProps {
  backgroundColor?: string;
  description: string;
  height: number;
  id: string;
  thumbnailHeight?: number;
  thumbnailLeft?: number;
  thumbnailTop?: number;
  thumbnailUrl: string;
  thumbnailWidth?: number;
  title: string;
  url: string;
  width: number;
}

export class Picture extends Record<PictureProps>({
  backgroundColor: 'black',
  description: '',
  height: 0,
  id: '',
  thumbnailHeight: 0,
  thumbnailLeft: 0,
  thumbnailTop: 0,
  thumbnailUrl: '',
  thumbnailWidth: 0,
  title: '',
  url: '',
  width: 1,
}) implements PictureProps {
  public backgroundColor: string;
  public description: string;
  public height: number;
  public id: string;
  public thumbnailHeight: number;
  public thumbnailLeft: number;
  public thumbnailTop: number;
  public thumbnailUrl: string;
  public thumbnailWidth: number;
  public title: string;
  public url: string;
  public width: number;
};
