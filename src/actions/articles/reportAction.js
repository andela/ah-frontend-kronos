/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
import axios from 'axios';
import { toastSuccess, toastFailure } from '../../utils/toast';
import { ArticleConstants } from '../actionTypes';

const apiUrl = 'https://ah-backend-kronos-staging.herokuapp.com/api/articles/';
const lastPart = '/report/';

const reportArticleAction = (articleSlug, report) => dispatch => axios.post(`${apiUrl}${articleSlug}${lastPart}`, report, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
})
  .then((response) => {
    toastSuccess(response.data.msg, 'A');
    dispatch({
      type: ArticleConstants.ARTICLE_REPORT_SUCCESS,
    });
  })
  .catch((error) => {
    const responseData = error.response;
    let errorMessage;
    switch (responseData.status) {
      case 422:
        errorMessage = responseData.data.message;
        break;
      default:
        [errorMessage] = responseData.data.errors.reason;
    }
    toastFailure(errorMessage, 'A');
    dispatch({
      type: ArticleConstants.ARTICLE_REPORT_FAIL,
    });
  });

export default reportArticleAction;
