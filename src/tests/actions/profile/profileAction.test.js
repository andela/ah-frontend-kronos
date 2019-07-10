import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import profile from './__mocks__/index';
import {
  profileActionTypes,
} from '../../../actions/actionTypes';
import { fetchProfile, editProfile } from '../../../actions/profile/ProfileAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('profile actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should create an action to show the profile after loading', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: profile.view.success,
      });
    });
    const expectedActions = [
      {
        type: profileActionTypes.VIEW_PROFILE_REQUEST,
      },
      {
        type: profileActionTypes.VIEW_PROFILE_SUCCESS,
        payload: profile.view.success.profile,
      },
    ];
    return store.dispatch(fetchProfile())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action for failure to show the profile', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: profile.view.failure,
      });
    });
    const expectedActions = [
      {
        type: profileActionTypes.VIEW_PROFILE_REQUEST,
      },
      {
        type: profileActionTypes.VIEW_PROFILE_FAILED,
        payload: profile.view.failure.profile.detail,
      },
    ];
    return store.dispatch(fetchProfile())
      .then(() => {
        expect(store.getActions()).toStrictEqual(expectedActions);
      });
  });

  it('should create an action to edit the profile after loading', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: profile.edit.success,
      });
    });
    const expectedActions = [
      {
        type: profileActionTypes.VIEW_PROFILE_REQUEST,
      },
      {
        type: profileActionTypes.EDIT_PROFILE_SUCCESS,
        payload: profile.edit.success.profile,
      },
    ];

    return store.dispatch(editProfile())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create an action for failure to edit the profile', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: profile.edit.failure,
      });
    });
    const expectedActions = [
      {
        type: profileActionTypes.VIEW_PROFILE_REQUEST,
      },
      {
        type: profileActionTypes.EDIT_PROFILE_FAILED,
        payload: profile.edit.failure.profile.detail,
      },
    ];
    return store.dispatch(editProfile())
      .then(() => {
        expect(store.getActions()).toStrictEqual(expectedActions);
      });
  });
});
