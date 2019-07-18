import { ArticleConstants } from '../../actions/actionTypes';
import { initialArticleState } from '../initialState';

export default function articleReducer(state = initialArticleState, action) {
  switch (action.type) {
    case ArticleConstants.ARTICLE_REQUEST:
      return Object.assign(
        {}, state, action.payload, { created: false, creating: true },
      );
    case ArticleConstants.ARTICLE_SUCCESS:
      return Object.assign(
        {}, state, action.payload, { created: true, creating: false },
      );
    case ArticleConstants.ARTICLE_FAILURE:
      return Object.assign({}, state, action.payload, { created: false, creating: false });
    case ArticleConstants.ARTICLE_DELETE_REQUEST:
      return Object.assign(
        {}, state, action.payload, { deleting: true },
      );
    case ArticleConstants.ARTICLE_DELETE_SUCCESS:
      return Object.assign(
        {}, state, action.payload, { deleting: false, deleted: true },
      );
    case ArticleConstants.ARTICLE_DELETE_FAILURE:
      return Object.assign(
        {}, state, action.payload, { deleting: false, deleted: false },
      );
    default:
      return state;
  }
}
