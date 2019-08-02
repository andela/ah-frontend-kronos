import reducer from '../../../reducers/profile/profileReducer';
import followReducer from '../../../reducers/profile/followReducer';
import * as types from '../../../actions/actionTypes';

describe('edit reducer initial state', () => {
  const initialState = {
    profile: {},
    isLoading: false,
    editSuccess: false,
    isFollowing: false,
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle success to edit profile', () => {
    expect(
      reducer(
        {
          isLoading: true,
        },
        {
          type: types.profileActionTypes.EDIT_PROFILE_SUCCESS,
          payload: { isLoading: false },
        },
      ),
    ).toEqual({
      editSuccess: true,
      isLoading: false,
      profile: { isLoading: false },
    });
  });
  it('should handle failure to edit profile', () => {
    expect(
      reducer(
        {
          isLoading: false,
        },
        {
          type: types.profileActionTypes.EDIT_PROFILE_FAILED,
          payload: { isLoading: true },
        },
      ),
    ).toEqual({
      editFailure: true,
      isLoading: false,
      profile: { isLoading: true },
    });
  });
});

describe('view reducer initial state', () => {
  const initialState = {
    profile: {},
    isLoading: false,
    editSuccess: false,
    isFollowing: false,
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle success loading to view profile', () => {
    expect(
      reducer(
        {
          isLoading: false,
        },
        {
          type: types.profileActionTypes.VIEW_PROFILE_REQUEST,
        },
      ),
    ).toEqual({ isLoading: true });
  });
  it('should handle success to view profile', () => {
    expect(
      reducer(
        {
          isLoading: true,
        },
        {
          type: types.profileActionTypes.VIEW_PROFILE_SUCCESS,
          payload: { isLoading: true },
        },
      ),
    ).toEqual({
      isLoading: false,
      profile: { isLoading: true },
    });
  });
  it('should handle failure to view profile', () => {
    expect(
      reducer(
        {
          isLoading: true,
        },
        {
          type: types.profileActionTypes.VIEW_PROFILE_FAILED,
          payload: { isLoading: true },
        },
      ),
    ).toEqual({
      isLoading: false,
      error: { isLoading: true },
    });
  });
  it('return all the users followers', () => {
    const followersfetchingAction = {
      type: types.profileActionTypes.FETCH_FOLLOWING_PROFILES,
      payload: ['fred', 'Anorld'],
    };
    const followersfetchingsuccess = {
      followers: ['fred', 'Anorld'],
      isFollowing: false,
      isLoading: false,
      profile: {},
      editSuccess: false,
    };
    expect(followReducer(initialState, followersfetchingAction)).toEqual(followersfetchingsuccess);
  });
});
