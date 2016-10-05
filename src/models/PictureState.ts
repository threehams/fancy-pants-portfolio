import { List, Record } from 'immutable';
import { Picture, SourcePicture } from './';

interface PictureStateProps {
  banner: Picture;
  pictures?: List<Picture>;
  sourcePicture?: SourcePicture | null;
}

export class PictureState extends Record<PictureStateProps>({
  banner: null,
  pictures: List([]),
  sourcePicture: null,
}) implements PictureStateProps {
  public banner: Picture;
  public pictures: List<Picture>;
  public sourcePicture: SourcePicture;
};
