import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import getSingleArticle from '../../../actions/articles/articleActions';
import { articlesTypes } from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const slug = 'slug-is-as12';
describe('getSingleArticle', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch FETCH_AN_ARTICLE action', () => {
    const response = {
      data: {
        article: {
          title: 'test_title',
          body: 'Test',
          description: 'Test',
        },
      },
    };
    const store = mockStore();
    const expectedActions = [
      {
        type: articlesTypes.FETCHING_ARTICLE,
      },
      {
        type: articlesTypes.FETCH_AN_ARTICLE,
        payload: response.data.article,
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response.data,
      });
    });

    return store.dispatch(getSingleArticle(slug)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
