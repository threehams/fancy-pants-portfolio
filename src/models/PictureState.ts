import { List, Record } from 'immutable';
import { Picture, SourcePicture } from './';

interface PictureStateProps {
  pictures?: List<Picture>;
  sourcePicture?: SourcePicture | null;
}

export class PictureState extends Record<PictureStateProps>({
  pictures: List([]),
  sourcePicture: null,
}) implements PictureStateProps {
  public pictures: List<Picture>;
  public sourcePicture: SourcePicture;
};
