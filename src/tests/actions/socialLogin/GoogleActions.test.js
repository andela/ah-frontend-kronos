import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  GOOGLE_AUTHENTICATION,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
} from '../../../actions/socialLoginTypes';

import LoginGoogle from '../../../actions/socialLogin/GoogleActions';
import data from '../../mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Google authentication process', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('logs in successfully', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data.soicalAuthData.success,
      });
      document.location.href = '/successpage';
    });
    const expectedActions = [
      { type: GOOGLE_AUTHENTICATION },

      {
        payload: data.soicalAuthData.success.user,
        type: GOOGLE_AUTH_SUCCESS,
      },
    ];
    return store.dispatch(LoginGoogle('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fails to login', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: data.soicalAuthData.failure,
      });
    });
    const expectedActions = [
      { type: GOOGLE_AUTHENTICATION },
      {
        payload: data.soicalAuthData.failure.errors,
        type: GOOGLE_AUTH_FAIL,
      },
    ];
    return store.dispatch(LoginGoogle('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
