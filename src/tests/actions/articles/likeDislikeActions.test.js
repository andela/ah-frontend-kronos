import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import * as likeDislikeActions from '../../../actions/articles/likeDislikeAction';
import { ArticleConstants } from '../../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('liking and disliking of an article', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  const articleSlug = 'article-title';

  it('should like an article with an action type of ARTICLE_LIKE_SUCCESS', () => {
    const responseData = {
      like_status: {
        message: 'You have liked an article',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ response: responseData });
    });

    const expectedAction = [
      {
        payload: responseData,
        type: ArticleConstants.ARTICLE_LIKING_SUCCESS,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(likeDislikeActions.likingArticle({ like_status: true }, articleSlug))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });


  it('should not like an article with an action type of ARTICLE_LIKE_FAILURE', () => {
    const responseData = {
      like_status: {
        message: 'You have already liked the article',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ response: responseData });
    });

    const expectedAction = [
      {
        payload: responseData.like_status.message,
        type: ArticleConstants.ARTICLE_LIKING_FAILURE,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(likeDislikeActions.likingArticle({ like_status: true }, articleSlug))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });

  it('should  dislike an article with an action type of ARTICLE_DISLIKE_SUCCESS', () => {
    const responseData = {
      like_status: {
        message: 'You have disliked an article',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ response: responseData });
    });

    const expectedAction = [
      {
        payload: responseData,
        type: ArticleConstants.ARTICLE_DISLIKING_SUCCESS,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(likeDislikeActions.likingArticle({ like_status: false }, articleSlug))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });

  it('should not dislike an article with an action type of ARTICLE_DISLIKE_FAILURE', () => {
    const responseData = {
      like_status: {
        message: 'You have already disliked the article',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ response: responseData });
    });

    const expectedAction = [
      {
        payload: responseData.like_status.message,
        type: ArticleConstants.ARTICLE_DISLIKING_FAILURE,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(likeDislikeActions.likingArticle({ like_status: false }, articleSlug))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });

  it('should not like an article when not authenticated', () => {
    const responseData = {
      like_status: {
        detail: 'Authentication credentials were not provided.',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 403, response: responseData });
    });

    const expectedAction = [
      {
        type: ArticleConstants.ARTICLE_LIKING_FAILURE,
        payload: responseData.like_status.detail,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(likeDislikeActions.likingArticle({ like_status: true }, articleSlug))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });
});
