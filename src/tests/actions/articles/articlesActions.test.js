import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import fetchArticles from '../../../actions/articles/articlesActions';
import { articlesTypes } from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetch articles', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('successfully fetches articles', () => {
    const response = {
      data: {
        article: {
          results: {
            title: 'test_title',
            body: 'Test',
            description: 'Test',
          },
        },
      },
    };
    const store = mockStore({ articles: [] });
    const expectedActions = [
      {
        type: articlesTypes.FETCH_ARTICLES,
        payload: response.data.article.results,
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response.data,
      });
    });
    return store.dispatch(fetchArticles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
