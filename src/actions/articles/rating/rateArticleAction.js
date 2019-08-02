/* eslint-disable func-names */
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastSuccess, toastFailure } from '../../../utils/toast';
import { ArticleConstants } from '../../actionTypes';

const apiUrl = 'https://ah-backend-kronos-staging.herokuapp.com/api/articles/';
const lastPart = '/rate';


const articleRatingAction = (articleSlug, rating) => dispatch => axios.post(`${apiUrl}${articleSlug}${lastPart}`, rating, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
})
  .then(() => {
    toast.dismiss();
    toastSuccess('Your rated this article successfully', 'A');
    dispatch({
      type: ArticleConstants.ARTICLE_RATING_SUCCESS,
    });
  })
  .catch((error) => {
    const errorResponse = error.response.data;
    if ({}.hasOwnProperty.call(errorResponse, 'article')) {
      toast.dismiss();
      toastFailure(errorResponse.article.detail, 'A');
      dispatch({
        type: ArticleConstants.ARTICLE_RATING_FAIL,
        payload: errorResponse.article.detail,
      });
    } else {
      dispatch({
        type: ArticleConstants.ARTICLE_RATING_UPDATE,
        payload: errorResponse.errors.error[0],
      });
    }
  });


export default articleRatingAction;
