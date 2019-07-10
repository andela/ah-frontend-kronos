import { profileActionTypes } from '../../actions/actionTypes';
import { initialProfileState } from '../initialState';


export default function (state = initialProfileState, action) {
  switch (action.type) {
    case profileActionTypes.VIEW_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case profileActionTypes.VIEW_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    case profileActionTypes.VIEW_PROFILE_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case profileActionTypes.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        editSuccess: true,
      };
    case profileActionTypes.EDIT_PROFILE_FAILED:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        editFailure: true,
      };
    default:
      return state;
  }
}
