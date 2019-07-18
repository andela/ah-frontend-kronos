import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import * as createActicleActions from '../../../actions/articles/articleAction';
import { ArticleConstants } from '../../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('creating an article', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  const mockedData = {};

  it('should create an article with an action type of ARTICLE_SUCCESS', () => {
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
      .dispatch(createActicleActions.registerArticle(mockedData))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });


  it('should not create an article with an action type of ARTICLE_FAILURE', () => {
    const responseData = {
      errors: {},
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
      .dispatch(createActicleActions.registerArticle(mockedData))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });
});
