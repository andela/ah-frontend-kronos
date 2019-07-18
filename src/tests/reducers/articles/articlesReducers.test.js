import articlesReducer from '../../../reducers/articles/articlesReducers';
import { ArticleConstants } from '../../../actions/actionTypes';

const initialState = { articles: [] };
const articles = [];

describe('Articles Reducer', () => {
  it('returns initial state', () => {
    const newState = articlesReducer(initialState, {});

    expect(initialState).toEqual(newState);
  });

  it('tests successful fetch of articles', () => {
    const newState = articlesReducer(initialState, {
      type: ArticleConstants.FETCH_ARTICLES,
      payload: articles,
    });
    expect(newState).toEqual({ articles, isFetching: false });
  });
});
