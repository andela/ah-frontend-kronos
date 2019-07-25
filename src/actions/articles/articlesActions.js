import axios from 'axios';
import { ArticleConstants } from '../actionTypes';


let fetchArticlesUrl = 'https://ah-backend-kronos-staging.herokuapp.com/api/articles/';
const fetchArticles = url => (dispatch) => {
  if (url !== undefined) {
    fetchArticlesUrl = url;
  }
  axios.get(fetchArticlesUrl).then((response) => {
    dispatch({
      type: ArticleConstants.FETCH_ARTICLES,
      payload: response.data.article,
    });
  });
};

export default fetchArticles;
