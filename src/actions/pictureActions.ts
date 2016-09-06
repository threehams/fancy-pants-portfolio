import { List } from 'immutable';

import { Picture, Source, SourcePicture } from '../models';

export interface SetState {
  type: 'SET_STATE';
  payload: {
    pictures: List<Picture>;
    banner: Picture;
  };
};

export interface SetStateData {
  pictures: PictureData[];
  banner: PictureData;
}

interface SourceData {
  url: string;
  width: number;
}

interface PictureData {
  description: string;
  height: number;
  id: string;
  sources: SourceData[];
  thumbnailUrl: string;
  thumbnailWidth: number;
  title: string;
  url: string;
  width: number;
};

export interface ClosePictureFunction {
  (source: SourcePicture): ClosePicture;
}

export interface OpenPictureFunction {
  (source: SourcePicture): OpenPicture;
}

export interface ClosePicture {
  payload: {
    source: SourcePicture;
  };
  type: 'CLOSE_PICTURE';
}

export interface OpenPicture {
  payload: {
    source: SourcePicture;
  };
  type: 'OPEN_PICTURE';
}

// TODO the 'any' is ugly but need to move away from records to deal with record nesting on creation
export const setState = (stateData: any): SetState => {
  stateData.banner.sources = List(stateData.banner.sources.map((source) => {
    return new Source(source);
  }));
  return {
    payload: {
      banner: new Picture(stateData.banner),
      pictures: List(stateData.pictures).map((picture: any) => {
        picture.sources = List(picture.sources.map((source) => new Source(source)));
        return new Picture(picture);
      }),
    },
    type: 'SET_STATE',
  };
};

export const openPicture: OpenPictureFunction = (source) => ({
  payload: {
    source,
  },
  type: 'OPEN_PICTURE',
});

export const closePicture: ClosePictureFunction = (source) => ({
  payload: {
    source,
  },
  type: 'CLOSE_PICTURE',
});
