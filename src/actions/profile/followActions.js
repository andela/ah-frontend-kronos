import axios from 'axios';

import { followActionTypes, profileActionTypes } from '../actionTypes';

export const followAuthorAction = username => dispatch => axios
  .post(
    `https://ah-backend-kronos-staging.herokuapp.com/api/profiles/${username}/follow`,
    { body: {} },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    },
  )
  .then((response) => {
    dispatch({
      type: followActionTypes.FOLLOW_AUTHOR_SUCCESS,
      payload: response.data,
    });
  })
  .catch((error) => {
    dispatch({
      type: followActionTypes.FOLLOW_AUTHOR_FAIL,
      payload: error.response,
    });
  });
export const unfollowAuthorAction = username => dispatch => axios
  .delete(
    `https://ah-backend-kronos-staging.herokuapp.com/api/profiles/${username}/follow`,

    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    },
  )
  .then((response) => {
    dispatch({
      type: followActionTypes.UNFOLLOW_AUTHOR_SUCCESS,
      payload: response.data,
    });
  })
  .catch((error) => {
    dispatch({
      type: followActionTypes.UNFOLLOW_AUTHOR_FAILURE,
      payload: error.response,
    });
  });
export const fetchAuthorProfile = username => dispatch => axios
  .get(`https://ah-backend-kronos-staging.herokuapp.com/api/profiles/${username}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
  .then((response) => {
    dispatch({
      type: profileActionTypes.VIEW_AUTHOR_PROFILE_SUCCESS,
      payload: response.data.profile,
    });
  })
  .catch((error) => {
    dispatch({
      type: profileActionTypes.VIEW_PROFILE_FAILED,
      payload: error.response.data.profile.detail,
    });
  });

export const fetchFollowing = username => dispatch => axios
  .get(`https://ah-backend-kronos-staging.herokuapp.com/api/profiles/${username}/followers`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
  .then((response) => {
    dispatch({
      type: profileActionTypes.FETCH_FOLLOWING_PROFILES,
      payload: response.data.followers,
    });
  });
