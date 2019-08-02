/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import articleRatingAction from '../../../actions/articles/rating/rateArticleAction';
import { ArticleConstants } from '../../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('update article rating', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Updating rating of an article fails', () => {
    const response = {
      errors: {
        error: [
          'Article rating already exists, Please',
        ],
      },
    };
    const expectedActions = [
      {
        type: ArticleConstants.ARTICLE_RATING_UPDATE,
        payload: response.errors.error[0],
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response,
      });
    });
    return store.dispatch(articleRatingAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should not rate article if does not exist', () => {
    const response = {
      article: {
        detail: 'Not found.',
      },
    };
    const expectedActions = [
      {
        type: ArticleConstants.ARTICLE_RATING_FAIL,
        payload: response.article.detail,
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response,
      });
    });
    return store.dispatch(articleRatingAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Article should be rated successfully', () => {
    const expectedActions = [
      {
        type: ArticleConstants.ARTICLE_RATING_SUCCESS,
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });
    return store.dispatch(articleRatingAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
