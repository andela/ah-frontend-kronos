import { followActionTypes, profileActionTypes } from '../../actions/actionTypes';
import { initialProfileState } from '../initialState';

const followReducer = (
  state = {
    profile: initialProfileState.profile.following,
    isFollowing: false,
    authorProfiles: [],
    authorProfile: {},
    followers: [],
  },
  action,
) => {
  switch (action.type) {
    case followActionTypes.FOLLOW_AUTHOR_SUCCESS: {
      return { ...state, payload: action.payload, isFollowing: true };
    }
    case followActionTypes.UNFOLLOW_AUTHOR_SUCCESS: {
      return { ...state, payload: action.payload, isFollowing: false };
    }
    case followActionTypes.UNFOLLOW_AUTHOR_FAILURE:
      return {
        ...state,
        payload: action.payload,
        isFollowing: true,
      };
    case profileActionTypes.VIEW_AUTHOR_PROFILE_SUCCESS: {
      return { ...state, authorProfile: action.payload };
    }
    case profileActionTypes.FETCH_FOLLOWING_PROFILES:
      return {
        ...state,
        followers: action.payload,
      };
    default:
      return state;
  }
};
export default followReducer;
