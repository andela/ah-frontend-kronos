import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import * as deleteActions from '../../../actions/articles/articleAction';
import { ArticleConstants } from '../../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('updating an article', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  const articleSlug = 'article-title';

  it('should delete article with an action type of ARTICLE_DELETE_SUCCESS', () => {
    const responseData = {
      article: {},
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: responseData });
    });

    const expectedAction = [
      {
        type: ArticleConstants.ARTICLE_DELETE_REQUEST,
      },
      {
        payload: responseData,
        type: ArticleConstants.ARTICLE_DELETE_SUCCESS,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(deleteActions.deleteArticle(articleSlug))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });


  it('should not delete article with an action type of ARTICLE_FAILURE', () => {
    const responseData = {
      errors: {
        error: 'Article doesnot exist',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: responseData });
    });

    const expectedAction = [
      {
        type: ArticleConstants.ARTICLE_DELETE_REQUEST,
      },
      {
        payload: responseData,
        type: ArticleConstants.ARTICLE_DELETE_FAILURE,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(deleteActions.deleteArticle(articleSlug))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });
});
