/* eslint-disable func-names */
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastSuccess, toastFailure } from '../../../utils/toast';
import { ArticleConstants } from '../../actionTypes';

const apiUrl = 'https://ah-backend-kronos-staging.herokuapp.com/api/articles/';
const lastPart = '/rate';

const articleRatingUpdateAction = (articleSlug, rating) => dispatch => axios.patch(`${apiUrl}${articleSlug}${lastPart}`, rating, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
})
  .then((response) => {
    toast.dismiss();
    toastSuccess('Your Rating for Article was Updated!', 'A');
    dispatch({
      type: ArticleConstants.ARTICLE_RATING_UPDATE_SUCCESS,
      payload: response.data.article.rating,
    });
  })
  .catch((error) => {
    toast.dismiss();
    toastFailure('Article rating update failed.', 'A');
    dispatch({
      type: ArticleConstants.ARTICLE_RATING_UPDATE_FAIL,
      payload: error.response,
    });
  });

export default articleRatingUpdateAction;
