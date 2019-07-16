import { ArticleConstants } from '../../store/actions/auth/actionTypes';

const initialArticle = {
  creating: false,
  created: false,
  article: {},
};

export default function articleReducer(state = initialArticle, action) {
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
    default:
      return state;
  }
}
