import { ArticleConstants } from '../../actions/actionTypes';
import { initialArticlesState } from '../initialState';

const articlesReducer = (state = initialArticlesState, action) => {
  switch (action.type) {
    case ArticleConstants.FETCHING_ARTICLEs_IN_PROGRESS:
      return {
        ...state,
        isFetching: true,
      };
    case ArticleConstants.FETCH_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default articlesReducer;
