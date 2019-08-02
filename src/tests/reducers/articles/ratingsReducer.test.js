import rateArticlesReducer from '../../../reducers/articles/rating/ratingArticleReducer';
import { ArticleConstants } from '../../../actions/actionTypes';

const initialState = {
  articleRated: null,
  isUpdatingRating: true,
  ratingIsUpdated: null,
  rating: 0,
};

const article = {};

describe('Article Rating Reducer', () => {
  it('tests inititial state of article rating reducer', () => {
    const newState = rateArticlesReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });


  it('tests successful update of an articles rating', () => {
    const newState = rateArticlesReducer(initialState,
      {
        type: ArticleConstants.ARTICLE_RATING_UPDATE_SUCCESS,
        payload: article,
      });

    expect(newState.isUpdatingRating).toEqual(true);
  });

  it('tests unsuccessful update of an articles rating', () => {
    const newState = rateArticlesReducer(initialState,
      {
        type: ArticleConstants.ARTICLE_RATING_UPDATE_FAIL,
        payload: article,
      });

    expect(newState.isUpdatingRating).toEqual(true);
  });


  it('tests successful executes of an articles rating', () => {
    const newState = rateArticlesReducer(initialState,
      {
        type: ArticleConstants.ARTICLE_RATING_FAIL,
        payload: article,
      });

    expect(newState.isUpdatingRating).toEqual(false);
  });

  it('tests successful executes of an articles rating', () => {
    const newState = rateArticlesReducer(initialState,
      {
        type: ArticleConstants.ARTICLE_RATING_SUCCESS,
        payload: article,
      });

    expect(newState.isUpdatingRating).toEqual(false);
  });
});

it('tests successful executes of an articles rating', () => {
  const newState = rateArticlesReducer(initialState,
    {
      type: ArticleConstants.ARTICLE_RATING_UPDATE,
      payload: article,
    });

  expect(newState.isUpdatingRating).toEqual(true);
});
