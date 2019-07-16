import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  FACEBOOK_AUTHENTICATION,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
} from '../../../actions/socialLoginTypes';

import LoginFacebook from '../../../actions/socialLogin/FacebookActions';
import data from '../../mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('facebook authentication process', () => {
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
    });
    const expectedActions = [
      { type: FACEBOOK_AUTHENTICATION },

      {
        payload: data.soicalAuthData.success.user,
        type: FACEBOOK_AUTH_SUCCESS,
      },
    ];
    return store.dispatch(LoginFacebook('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9')).then(() => {
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
      { type: FACEBOOK_AUTHENTICATION },
      {
        payload: data.soicalAuthData.failure.errors,
        type: FACEBOOK_AUTH_FAIL,
      },
    ];
    return store.dispatch(LoginFacebook('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
