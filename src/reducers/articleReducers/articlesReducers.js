import { articlesTypes } from '../../actions/types';

const initialArticlesState = {
  articles: [],
};
const articlesReducer = (state = initialArticlesState, action) => {
  switch (action.type) {
    case articlesTypes.FETCH_ARTICLES:
      console.log('actioooooon', initialArticlesState);
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default articlesReducer;
