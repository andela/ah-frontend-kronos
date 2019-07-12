import { LoginConstants } from '../../../actions/actionTypes';


const loginReducer = (state = {
  isUserLoggedIn: false,
  token: '',
  user: {},
  username: '',
  logged_in: false,
}, { type, payload }) => {
  switch (type) {
    case LoginConstants.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        isUserLoggedIn: true,
        logged_in: true,
      };
    case LoginConstants.LOGIN_USER_FAILED:
      return {
        ...state,
        errors: payload.errors.error[0],
        isUserLoggedIn: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
