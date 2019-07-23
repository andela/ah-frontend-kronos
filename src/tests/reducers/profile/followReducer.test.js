import followReducer from '../../../reducers/profile/followReducer';
import { followActionTypes } from '../../../actions/actionTypes';

const initialState = {
  profile: {},
  isLoading: false,
  isFollowing: false,
};
describe('Follow reducer initial state', () => {
  it('fails to follow an author', () => {
    const failedFollowAction = {
      type: followActionTypes.FOLLOW_AUTHOR_FAIL,
      payload: 'Failed to follow user',
    };
    const followsFailure = {
      profile: {},
      isLoading: false,

      isFollowing: false,
    };
    expect(followReducer(initialState, failedFollowAction)).toEqual(followsFailure);
  });
  it('successfully follows an author', () => {
    const successFollowAction = {
      type: followActionTypes.FOLLOW_AUTHOR_SUCCESS,
      isFollowing: true,
    };
    const followSuccess = {
      profile: {},
      isLoading: false,

      isFollowing: true,
    };
    expect(followReducer(initialState, successFollowAction)).toEqual(followSuccess);
  });
  it('follow a user', () => {
    const followAction = {
      type: followActionTypes.FOLLOW_AUTHOR_SUCCESS,
      isFollowing: true,
    };
    const followSuccess = {
      profile: {},
      isLoading: false,
      isFollowing: true,
    };
    expect(followReducer(initialState, followAction)).toEqual(followSuccess);
  });
});
