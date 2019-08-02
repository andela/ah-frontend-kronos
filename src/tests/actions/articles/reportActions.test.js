/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import reportArticleAction from '../../../actions/articles/reportAction';
import { ArticleConstants } from '../../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('report article due to abuse', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });


  it('should not report article if no reason is given', () => {
    const expectedActions = [
      {
        type: ArticleConstants.ARTICLE_REPORT_FAIL,
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          errors: {
            reason: [
              'This field may not be blank.',
            ],
          },
        },
      });
    });
    return store.dispatch(reportArticleAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should not report article if already reported', () => {
    const expectedActions = [
      {
        type: ArticleConstants.ARTICLE_REPORT_FAIL,
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: {

          message: 'you already reported this article',

        },
      });
    });
    return store.dispatch(reportArticleAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Article should be reported successfully', () => {
    const expectedActions = [
      {
        type: ArticleConstants.ARTICLE_REPORT_SUCCESS,
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { message: 'gft' },
        },
      });
    });
    return store.dispatch(reportArticleAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
