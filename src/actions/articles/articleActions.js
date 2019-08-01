import axios from 'axios';
import { ArticleConstants } from '../actionTypes';

const getSingleArticle = slug => (dispatch) => {
  const header = {
    'Content-Type': 'application/json',
  };

  if (sessionStorage.getItem('token')) {
    header.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
  }

  dispatch({
    type: ArticleConstants.FETCHING_ARTICLE,
  });
  return axios
    .get(`https://ah-backend-kronos-staging.herokuapp.com/api/articles/${slug}`, { headers: header })
    .then((res) => {
      dispatch({
        type: ArticleConstants.FETCH_AN_ARTICLE,
        payload: res.data.article,
      });
    })
    .catch((error) => {
      dispatch({
        type: ArticleConstants.ARTICLE_FETCH_NOT_FOUND,
        payload: error.response.data,
      });
    });
};
export default getSingleArticle;
