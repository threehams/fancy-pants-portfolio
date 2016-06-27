import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import { List } from 'immutable';
import axios = require('axios');

import { Picture, State } from '../models';

export const SET_STATE = 'SET_STATE';
export type SET_STATE = {};
export const RECEIVE_PICTURES_REQUEST = 'RECEIVE_PICTURES_REQUEST';
export type RECEIVE_PICTURES_REQUEST = {};
export const RECEIVE_PICTURES_SUCCESS = 'RECEIVE_PICTURES_SUCCESS';
export type RECEIVE_PICTURES_SUCCESS = { pictures: List<Picture> };
export const RECEIVE_PICTURES_FAILURE = 'RECEIVE_PICTURES_FAILURE';
export type RECEIVE_PICTURES_FAILURE = Error;

interface PictureData {
  description: string;
  id: string;
  title: string;
  url: string;
};

export const fetchPictures = () => {
  return (dispatch) => {
    dispatch(requestPictures());
    return axios.get<PictureData[]>('/api/pictures/')
      .then(response => dispatch(receivePictures(response.data)))
      .catch(error => dispatch(errorPictures(error)));
  };
};

const requestPictures = (): Action<RECEIVE_PICTURES_REQUEST> => ({
  payload: {},
  type: RECEIVE_PICTURES_REQUEST,
});

const receivePictures = (pictures: PictureData[]): Action<RECEIVE_PICTURES_SUCCESS> => ({
  payload: {
    pictures: List(pictures).map(picture => new Picture(picture)),
  },
  type: RECEIVE_PICTURES_SUCCESS,
});

const errorPictures = (error: Error): Action<RECEIVE_PICTURES_FAILURE> => ({
  error: true,
  payload: error,
  type: RECEIVE_PICTURES_FAILURE,
});
