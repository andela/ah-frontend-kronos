import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import * as updateActicleActions from '../../../actions/articles/articleAction';
import { ArticleConstants } from '../../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('updating an article', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  const data = {
    title: 'article title',
    body: 'article body',
    description: 'article description',
  };

  const articleSlug = 'article-title';

  it('should update article with an action type of ARTICLE_SUCCESS', () => {
    const responseData = {
      article: {},
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: responseData });
    });

    const expectedAction = [
      {
        type: ArticleConstants.ARTICLE_REQUEST,
      },
      {
        payload: responseData,
        type: ArticleConstants.ARTICLE_SUCCESS,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(updateActicleActions.updateArticle(data, articleSlug))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });


  it('should not update article with an action type of ARTICLE_FAILURE', () => {
    const responseData = {
      errors: {
        title: ['This field should not be blank'],
        description: ['This field should not be blank'],
        body: ['This field should not be blank'],
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: responseData });
    });

    const expectedAction = [
      {
        type: ArticleConstants.ARTICLE_REQUEST,
      },
      {
        payload: responseData,
        type: ArticleConstants.ARTICLE_FAILURE,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(updateActicleActions.updateArticle(data, articleSlug))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });
});
