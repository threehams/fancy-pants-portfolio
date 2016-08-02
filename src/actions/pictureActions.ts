import { Dispatch } from 'redux';
import { List } from 'immutable';
import axios = require('axios');

import { Picture } from '../models';

export interface SetState {
  type: 'SET_STATE';
};
export interface ReceivePicturesRequest {
  type: 'RECEIVE_PICTURES_REQUEST';
};
export interface ReceivePicturesSuccess {
  type: 'RECEIVE_PICTURES_SUCCESS';
  payload: {
    pictures: List<Picture>;
  };
};
export interface ReceivePicturesFailure {
  type: 'RECEIVE_PICTURES_FAILURE';
  error: boolean;
  payload: Error;
};

interface PictureData {
  description: string;
  height: number;
  id: string;
  thumbnailUrl: string;
  thumbnailWidth: number;
  title: string;
  url: string;
  width: number;
};

const requestPictures = (): ReceivePicturesRequest => ({
  type: 'RECEIVE_PICTURES_REQUEST',
});

const receivePictures = (pictures: PictureData[]): ReceivePicturesSuccess => ({
  payload: {
    pictures: List(pictures).map(picture => new Picture(picture)),
  },
  type: 'RECEIVE_PICTURES_SUCCESS',
});

const errorPictures = (error: Error): ReceivePicturesFailure => ({
  error: true,
  payload: error,
  type: 'RECEIVE_PICTURES_FAILURE',
});

export const fetchPictures = () => {
  return (dispatch: Dispatch<ReceivePicturesSuccess | ReceivePicturesFailure>) => {
    dispatch(requestPictures());
    return axios.get<PictureData[]>('/api/pictures/')
      .then(response => dispatch(receivePictures(response.data)))
      .catch(error => {
        // tslint:disable
        console.log(error);
        // tslint:enable
        dispatch(errorPictures(error));
      });
  };
};
