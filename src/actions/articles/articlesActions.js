import axios from 'axios';
import { articlesTypes } from '../types';

const fetchArticlesUrl = 'https://ah-backend-kronos-staging.herokuapp.com/api/articles/';
const fetchArticles = () => (dispatch) => {
  console.log('hjgdvg');
  return axios.get(fetchArticlesUrl).then((response) => {
    dispatch({
      type: articlesTypes.FETCH_ARTICLES,
      payload: response.data.article.results,
    });
  });
};
export default fetchArticles;
