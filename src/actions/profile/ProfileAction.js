import axios from 'axios';
import { toastSuccess, toastFailure } from '../../utils/toast';
import 'react-toastify/dist/ReactToastify.css';
import history from '../../utils/history';

import { profileActionTypes } from '../actionTypes';
import URLS from '../../urlConnections';

export const fetchProfile = () => (dispatch) => {
  dispatch({
    type: profileActionTypes.VIEW_PROFILE_REQUEST,
  });
  return axios.get(`${URLS.BACKEND_URL}/api/profiles/${sessionStorage.getItem('username')}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      dispatch({
        type: profileActionTypes.VIEW_PROFILE_SUCCESS,
        payload: response.data.profile,
      });
    })
    .catch((error) => {
      dispatch({
        type: profileActionTypes.VIEW_PROFILE_FAILED,
        payload: error.response.data.profile.detail,
      });
    });
};


export const editProfile = newProfile => (dispatch) => {
  dispatch({
    type: profileActionTypes.VIEW_PROFILE_REQUEST,
  });
  return axios.put(`${URLS.BACKEND_URL}/api/profiles/${sessionStorage.getItem('username')}/edit`, newProfile,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      dispatch({
        type: profileActionTypes.EDIT_PROFILE_SUCCESS,
        payload: response.data.profile,
      });
      toastSuccess('Profile updated Successfully!', 'A');
      history.push('/viewProfile');
    })
    .catch((error) => {
      dispatch({
        type: profileActionTypes.EDIT_PROFILE_FAILED,
        payload: error.response.data.profile.detail,
      });
      toastFailure('Update failed, try again!', 'A');
    });
};
