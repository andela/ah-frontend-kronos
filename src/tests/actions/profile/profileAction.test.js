import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import profile from './__mocks__/index';
import { profileActionTypes, followActionTypes } from '../../../actions/actionTypes';
import { fetchProfile, editProfile } from '../../../actions/profile/ProfileAction';
import { fetchFollowing, fetchAuthorProfile } from '../../../actions/profile/followActions';

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
    return store.dispatch(fetchProfile()).then(() => {
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
    return store.dispatch(fetchProfile()).then(() => {
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

    return store.dispatch(editProfile()).then(() => {
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
        payload: profile.edit.failure.profile,
      },
    ];
    return store.dispatch(editProfile()).then(() => {
      expect(store.getActions()).toStrictEqual(expectedActions);
    });
  });
  it('should get User following', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          followers: ['fred'],
        },
      });
    });
    const expectedActions = [
      {
        type: profileActionTypes.FETCH_FOLLOWING_PROFILES,
        payload: ['fred'],
      },
    ];
    const username = 'tester';
    return store.dispatch(fetchFollowing(username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('follow actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should create an action to fetch the profile', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: profile.view,
      });
    });
    const expectedActions = [
      {
        type: profileActionTypes.VIEW_AUTHOR_PROFILE_SUCCESS,
      },
    ];
    return store.dispatch(fetchAuthorProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should get User following', () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          followers: ['fred'],
        },
      });
    });
    const expectedActions = [
      {
        type: profileActionTypes.FETCH_FOLLOWING_PROFILES,
        payload: ['fred'],
      },
    ];
    const username = 'tester';
    return store.dispatch(fetchFollowing(username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
