import { ArticleConstants } from '../../actions/actionTypes';
import { initialLikeDislikeArticleState } from '../initialState';

const articlesLikeReducer = (state = initialLikeDislikeArticleState, action) => {
  switch (action.type) {
    case ArticleConstants.ARTICLE_LIKING_SUCCESS:
      return {
        ...state,
        article: action.payload,
        liking: true,
        disliking: false,
      };
    case ArticleConstants.ARTICLE_LIKING_FAILURE:
      return {
        ...state,
        article: action.payload,
        liking: false,
      };
    case ArticleConstants.ARTICLE_DISLIKING_SUCCESS:
      return {
        ...state,
        article: action.payload,
        liking: false,
        disliking: true,
      };
    case ArticleConstants.ARTICLE_DISLIKING_FAILURE:
      return {
        ...state,
        article: action.payload,
        disliking: false,
      };
    default:
      return state;
  }
};

export default articlesLikeReducer;
