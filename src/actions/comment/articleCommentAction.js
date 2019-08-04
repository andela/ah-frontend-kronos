import axios from 'axios';
import { toastSuccess, toastFailure } from '../../utils/toast';
import 'react-toastify/dist/ReactToastify.css';
import { articleCommentAction } from '../actionTypes';
import URLS from '../../urlConnections';

export const fetchComment = slug => dispatch => axios.get(`${URLS.BACKEND_URL}/api/articles/${slug}/comments/`, {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
})
  .then((response) => {
    dispatch({
      type: articleCommentAction.REQUEST_COMMENT_SUCCESS,
      payload: response.data.comment.comments,
    });
  }).catch((error) => {
    dispatch({
      type: articleCommentAction.REQUEST_COMMENT_FAILURE,
      payload: error.response.data.comment.error,
    });
  });

export const postComment = (slug, comment) => dispatch => axios.post(`${URLS.BACKEND_URL}/api/articles/${slug}/comments/`, comment, {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
})
  .then((response) => {
    dispatch({
      type: articleCommentAction.CREATE_COMMENT_SUCCESS,
      payload: response.data.comment,
    });
    toastSuccess('Comment successfully created', 'A');
  }).catch((error) => {
    dispatch({
      type: articleCommentAction.CREATE_COMMENT_FAILURE,
      payload: error.response.data.comment.error,
    });
    toastFailure('Failed to create comment, try again', 'A');
  });

export const deleteComment = (slug, commentId) => dispatch => axios.delete(`${URLS.BACKEND_URL}/api/articles/${slug}/comments/${commentId}`, {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
})
  .then((response) => {
    dispatch({
      type: articleCommentAction.DELETE_COMMENT_SUCCESS,
      payload: response.data.comment.message,
    });
    toastSuccess('Comment successfully deleted', 'A');
  }).catch((error) => {
    dispatch({
      type: articleCommentAction.DELETE_COMMENT_FAILURE,
      payload: error.response.data.comment.error,
    });
    toastFailure('Failed to delete comment, its not you comment!', 'A');
  });


export const editComment = (slug, commentId, commentUpdate) => dispatch => axios.patch(`${URLS.BACKEND_URL}/api/articles/${slug}/comments/${commentId}`, commentUpdate, {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
})
  .then((response) => {
    dispatch({
      type: articleCommentAction.EDIT_COMMENT_SUCCESS,
      payload: response.data.comment,
    });
    toastSuccess('Comment successfully updated!', 'A');
  }).catch((error) => {
    dispatch({
      type: articleCommentAction.EDIT_COMMENT_FAILURE,
      payload: error.response.data.comment,
    });
    toastFailure('Failed to edit comment, its not you comment!', 'A');
  });
