import { SUBMITTING_RESET_PASSWORD_SUCCESS, SUBMITTING_RESET_PASSWORD_FAIL, IS_SUBMITTING_RESET_PASSWORD } from '../../actions/auth/actionTypes';

const resetPasswordReducer = (state = { isSubmittingResetPassword: null }, { type, payload }) => {
  switch (type) {
    case IS_SUBMITTING_RESET_PASSWORD:
      return {
        ...state,
        isSubmittingResetPassword: true,
      };
    case SUBMITTING_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isSubmittingResetPassword: false,
      };
    case SUBMITTING_RESET_PASSWORD_FAIL:
      return {
        ...state,
        isSubmittingResetPassword: false,
        errors: payload.errors.email[0],
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;
