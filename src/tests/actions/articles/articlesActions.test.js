import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';


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
      data: [],
    };
    const store = mockStore({ articles: [] });
    const expectedActions = [];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response.data,
      });
    });
    expect(store.getActions()).toEqual(expectedActions);
  });
});
