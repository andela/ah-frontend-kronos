/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import articleRatingUpdateAction from '../../../actions/articles/rating/updateRatingAction';
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
        rating: [
          'A valid number is required.',
        ],
      },
    };
    const expectedActions = [
      {
        type: ArticleConstants.ARTICLE_RATING_UPDATE_FAIL,
        payload: response.data,
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response.data,
      });
    });
    return store.dispatch(articleRatingUpdateAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
