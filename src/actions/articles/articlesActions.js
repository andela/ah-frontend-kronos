import axios from 'axios';
import { ArticleConstants } from '../actionTypes';

const fetchArticlesUrl = 'https://ah-backend-kronos-staging.herokuapp.com/api/articles/';
const fetchArticles = () => dispatch => axios.get(fetchArticlesUrl).then((response) => {
  dispatch({
    type: ArticleConstants.FETCH_ARTICLES,
    payload: response.data.article.results,
  });
});
export default fetchArticles;
