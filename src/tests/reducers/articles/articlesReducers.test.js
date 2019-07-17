import articlesReducer from '../../../reducers/articleReducers/articlesReducers';
import { articlesTypes } from '../../../actions/types';

const initialState = { articles: [] };
const articles = [];

describe('Articles Reducer', () => {
  it('returns initial state', () => {
    const newState = articlesReducer(initialState, {});

    expect(initialState).toEqual(newState);
  });

  it('tests successful fetch of articles', () => {
    const newState = articlesReducer(initialState, {
      type: articlesTypes.FETCH_ARTICLES,
      payload: articles,
    });
    expect(newState).toEqual({ articles });
  });
});
