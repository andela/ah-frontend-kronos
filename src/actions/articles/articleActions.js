import axios from 'axios';
import { articlesTypes } from '../types';

const getSingleArticle = slug => (dispatch) => {
  dispatch({
    type: articlesTypes.FETCHING_ARTICLE,
  });
  return axios
    .get(`https://ah-backend-kronos-staging.herokuapp.com/api/articles/${slug}`)
    .then((res) => {
      dispatch({
        type: articlesTypes.FETCH_AN_ARTICLE,
        payload: res.data.article,
      });
    })
    .catch((error) => {
      dispatch({
        type: articlesTypes.ARTICLE_FETCH_NOT_FOUND,
        payload: error.response.data,
      });
      console.log(error.response.data);
    });
};
export default getSingleArticle;
