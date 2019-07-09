import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import * as registrationActions from '../../../actions/auth/registrationAction';
import { RegistrationConstants } from '../../../actions/auth/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('registration action testing', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  const data = {
    username: 'username',
    email: 'email@gmail.com',
    password: 'password',
  };

  it('should register user', () => {
    const responseData = {
      user: {
        msg: 'Successful registration',
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: responseData });
    });

    const expectedAction = [
      {
        type: RegistrationConstants.REGISTER_REQUEST,
      },
      {
        payload: responseData,
        type: RegistrationConstants.REGISTER_SUCCESS,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(registrationActions.registerUser(data))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedAction);
        },
      );
  });


  it('registration should fail with both existing email and username', () => {
    const responseData = {
      errors: {
        email: ['Email already exists'],
        username: ['Username already exists'],
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: responseData });
    });

    const expectedFailureActions = [
      {
        type: RegistrationConstants.REGISTER_REQUEST,
      },
      {
        payload: responseData,
        type: RegistrationConstants.REGISTER_FAILURE,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(registrationActions.registerUser(data))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedFailureActions);
        },
      );
  });


  it('registration should fail with either existing email or username', () => {
    const responseData = {
      errors: {
        email: ['Email already exists'],
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 400, response: responseData });
    });

    const expectedFailureActions = [
      {
        type: RegistrationConstants.REGISTER_REQUEST,
      },
      {
        payload: responseData,
        type: RegistrationConstants.REGISTER_FAILURE,
      },
    ];

    const store = mockStore({});
    return store
      .dispatch(registrationActions.registerUser(data))
      .then(
        () => {
          expect(store.getActions()).toEqual(expectedFailureActions);
        },
      );
  });
});
