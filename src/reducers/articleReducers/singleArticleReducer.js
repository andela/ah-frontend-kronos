import { articlesTypes } from '../../actions/types';

const singleArticleReducer = (
  state = { isFetching: true, article: {}, isNotFound: false },
  action,
) => {
  switch (action.type) {
    case articlesTypes.FETCHING_ARTICLE:
      return {
        ...state,
        isFetching: true,
      };
    case articlesTypes.ARTICLE_FETCH_NOT_FOUND:
      return {
        ...state,
        isNotFound: true,
        isFetching: false,
      };

    case articlesTypes.FETCH_AN_ARTICLE:
      return {
        ...state,
        article: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};
export default singleArticleReducer;
