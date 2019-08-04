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
        articles: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default articlesReducer;
