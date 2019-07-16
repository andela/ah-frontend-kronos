import axios from 'axios';
import { ArticleConstants } from '../actionTypes';
import URLS from '../../urlConnections';

export const ArticleLikeSuccess = successMessage => ({
  type: ArticleConstants.ARTICLE_LIKING_SUCCESS,
  payload: successMessage,
});

export const ArticleLikeFail = errorMessage => ({
  type: ArticleConstants.ARTICLE_LIKING_FAILURE,
  payload: errorMessage,
});

export const ArticleDislikeSuccess = successMessage => ({
  type: ArticleConstants.ARTICLE_DISLIKING_SUCCESS,
  payload: successMessage,
});

export function ArticleDislikeFail(errorMessage) {
  return {
    type: ArticleConstants.ARTICLE_DISLIKING_FAILURE,
    payload: errorMessage,
  };
}

export const likingArticle = (articleSlug, articleLike) => dispatch => axios.put(`${URLS.BACKEND_URL}/api/articles/${articleSlug}/likes/`,
  articleLike, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
  .then((response) => {
    const { like_status: { message } } = response.data;
    if (message === 'You have already liked the article') {
      dispatch(ArticleLikeFail(message));
    } else if (message === 'You have liked an article') {
      dispatch(ArticleLikeSuccess(response.data));
    } else if (message === 'You have already disliked the article') {
      dispatch(ArticleDislikeFail(message));
    } else if (message === 'You have disliked an article') {
      dispatch(ArticleDislikeSuccess(response.data));
    }
  })
  .catch((error) => {
    const { like_status: { detail } } = error.response.data;
    dispatch(ArticleLikeFail(detail));
  });
