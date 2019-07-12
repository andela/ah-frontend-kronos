import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import loginUserAction from '../../../actions/auth/loginAction';
import { LoginConstants } from '../../../actions/actionTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authenticating', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });


  it('user successfully logs in', () => {
    const loginDetails = {
      username: 'test_user',
      password: 'test_password',
    };
    const initialState = {
      isLoggingIn: null,
      isUserLoggedIn: false,
      token: '',
      username: '',
    };
    const expectedResponse = {
      user: {
        email: 'manorldsapiens@gmail.com',
        username: 'AnorldMukone',
        auth_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkFub3JsZE11a29uZSIsImV4cCI6MTU2NDczNjE1NH0.g7urLnYhISdyAqTAsPYVmwluFHxfn0g8pXa0JV14eVU',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse,
      });
    });
    // eslint-disable-next-line max-len
    const expectedActions = [{ type: LoginConstants.LOGIN_USER_SUCCESS, payload: expectedResponse }];
    const store = mockStore(initialState);
    return store
      .dispatch(loginUserAction(loginDetails))
      .then(() => {
        expect(expectedResponse).toEqual(expectedActions[0].payload);
      });
  });


  it('user fails loggin', () => {
    const loginDetails = {
      username: 'test_user',
      password: 'test_password',
    };
    const initialState = {
      isLoggingIn: null,
      isUserLoggedIn: false,
      token: '',
      username: '',
    };
    const expectedResponse = {
      errors: {
        error: [
          'A user with this email and password was not found.',
        ],
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        error: expectedResponse,
      });
    });
    const expectedActions = [{ type: LoginConstants.LOGIN_USER_FAILED, payload: expectedResponse }];
    const store = mockStore(initialState);
    return store
      .dispatch(loginUserAction(loginDetails))
      .then(() => {
        expect(expectedResponse).toEqual(expectedActions[0].payload);
      });
  });
});
