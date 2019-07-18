import { ArticleConstants } from '../../actions/actionTypes';

const singleArticleReducer = (
  state = { isFetching: true, article: {}, isNotFound: false },
  action,
) => {
  switch (action.type) {
    case ArticleConstants.FETCHING_ARTICLE:
      return {
        ...state,
        isFetching: true,
      };
    case ArticleConstants.ARTICLE_FETCH_NOT_FOUND:
      return {
        ...state,
        isNotFound: true,
        isFetching: false,
      };

    case ArticleConstants.FETCH_AN_ARTICLE:
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
