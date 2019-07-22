import axios from 'axios';
import { toast } from 'react-toastify';
import { ArticleConstants } from '../actionTypes';
import { toastSuccess, toastFailure } from '../../utils/toast';
import history from '../../utils/history';

export function ArticleSuccess(successMessage) {
  return {
    type: ArticleConstants.ARTICLE_SUCCESS,
    payload: successMessage,
  };
}

export function ArticleFail(errorMessage) {
  return {
    type: ArticleConstants.ARTICLE_FAILURE,
    payload: errorMessage,
  };
}

export function ArticleRequest() {
  return {
    type: ArticleConstants.ARTICLE_REQUEST,
  };
}


export function ArticleDeleteSuccess(successMessage) {
  return {
    type: ArticleConstants.ARTICLE_DELETE_SUCCESS,
    payload: successMessage,
  };
}

export function ArticleDeleteFail(errorMessage) {
  return {
    type: ArticleConstants.ARTICLE_DELETE_FAILURE,
    payload: errorMessage,
  };
}

export function ArticleDeleteRequest() {
  return {
    type: ArticleConstants.ARTICLE_DELETE_REQUEST,
  };
}

const BASE_URL = 'https://ah-backend-kronos-staging.herokuapp.com/api/articles/';

export function saveArticle(newArticle) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch(ArticleRequest());
    return axios.post(BASE_URL, newArticle, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        dispatch(ArticleSuccess(response.data));
        toast.dismiss();
        toastSuccess('Article created successfully', 'A');
        history.push(`/${response.data.article.slug}`);
      })
      .catch((error) => {
        toast.dismiss();
        toastFailure('Article creation failed! Authetication credentials were not provided', 'A');
        dispatch(ArticleFail(error.response.data));
      });
  };
}

export function updateArticle(newArticle, articleSlug) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch(ArticleRequest());
    return axios.patch(`${BASE_URL}${articleSlug}`, newArticle, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        dispatch(ArticleSuccess(response.data));
        toast.dismiss();
        toastSuccess('Article successfully updated', 'A');
        history.push(`/${articleSlug}`);
      })
      .catch((error) => {
        toast.dismiss();
        toastFailure('Article update failed! Try agin later.', 'A');
        dispatch(ArticleFail(error.response.data));
      });
  };
}

export function deleteArticle(articleSlug) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch(ArticleDeleteRequest());
    return axios.delete(`${BASE_URL}${articleSlug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        dispatch(ArticleDeleteSuccess(response.data));
        toast.dismiss();
        toastSuccess('Article deleted successfully.', 'A');
        history.push('/articles');
      })
      .catch((error) => {
        toast.dismiss();
        toastFailure('Article delete failed! Try agin later.', 'A');
        dispatch(ArticleDeleteFail(error.response.data));
      });
  };
}
