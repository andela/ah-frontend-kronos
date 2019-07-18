import singleArticleReducer from '../../../reducers/articles/singleArticleReducer';
import { ArticleConstants } from '../../../actions/actionTypes';


describe('articleReducer', () => {
  it('should return initial state on undefined action', () => {
    const expectedState = {
      article: {},
      isFetching: true,
      isNotFound: false,
    };

    expect(singleArticleReducer(undefined, {})).toEqual(expectedState);
  });
  it('should return Fetching action', () => {
    const initialState = {
      article: {},
      isFetching: false,
    };
    const expectedState = {
      article: {},
      isFetching: true,
    };
    const action = {
      type: ArticleConstants.FETCHING_ARTICLE,
    };

    expect(singleArticleReducer(initialState, action)).toEqual(expectedState);
  });
  it('should return Fetch an article action', () => {
    const initialState = {
      article: {},
      isFetching: true,
    };
    const expectedState = {
      article: { title: 'My article' },
      isFetching: false,
    };
    const action = {
      type: ArticleConstants.FETCH_AN_ARTICLE,
      payload: { title: 'My article' },
    };

    expect(singleArticleReducer(initialState, action)).toEqual(expectedState);
  });
  it('should return article Not Found action', () => {
    const initialState = {
      article: {},
      isFetching: true,
      isNotFound: false,
    };
    const expectedState = {
      article: {},
      isNotFound: true,
      isFetching: false,
    };
    const action = {
      type: ArticleConstants.ARTICLE_FETCH_NOT_FOUND,
    };

    expect(singleArticleReducer(initialState, action)).toEqual(expectedState);
  });
});
