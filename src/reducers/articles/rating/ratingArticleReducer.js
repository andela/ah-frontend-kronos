import { ArticleConstants } from '../../../actions/actionTypes';

const rateArticlesReducer = (state = {
  articleRated: null,
  isUpdatingRating: true,
  ratingIsUpdated: null,
  rating: 0,
}, { type, payload }) => {
  switch (type) {
    case ArticleConstants.ARTICLE_RATING_SUCCESS:
      return {
        ...state,
        articleRated: true,
        isUpdatingRating: false,
      };
    case ArticleConstants.ARTICLE_RATING_FAIL:
      return {
        ...state,
        errors: payload,
        articleRated: false,
        isUpdatingRating: false,
      };
    case ArticleConstants.ARTICLE_RATING_UPDATE:
      return {
        ...state,
        errors: payload,
        articleRated: false,
        isUpdatingRating: true,
      };
    case ArticleConstants.ARTICLE_RATING_UPDATE_FAIL:
      return {
        ...state,
        errors: payload,
        ratingIsUpdated: false,
      };
    case ArticleConstants.ARTICLE_RATING_UPDATE_SUCCESS:
      return {
        ...state,
        rating: payload,
        ratingIsUpdated: true,
      };
    default:
      return state;
  }
};

export default rateArticlesReducer;
