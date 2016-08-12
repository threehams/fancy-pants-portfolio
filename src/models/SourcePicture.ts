import { Record } from 'immutable';

interface Position {
  x: number;
  y: number;
}

interface Dimensions {
  height: number;
  width: number;
}

interface SourcePictureProps {
  dimensions: Dimensions;
  id: string;
  position: Position;
}

export class SourcePicture extends Record<SourcePictureProps>({
  dimensions: undefined,
  id: undefined,
  position: undefined,
}) implements SourcePictureProps {
  public dimensions: Dimensions;
  public id: string;
  public position: Position;
};
