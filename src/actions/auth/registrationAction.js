import axios from 'axios';
import { RegistrationConstants } from '../actionTypes';
import { toastSuccess, toastFailure } from '../../utils/toast';
import history from '../../utils/history';

export function registerUserSuccess(successMessage) {
  return {
    type: RegistrationConstants.REGISTER_SUCCESS,
    payload: successMessage,
  };
}

export function registerUserFail(errorMessage) {
  return {
    type: RegistrationConstants.REGISTER_FAILURE,
    payload: errorMessage,
  };
}

export function registerRequest() {
  return {
    type: RegistrationConstants.REGISTER_REQUEST,
  };
}

export function registerUser(newUser) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch(registerRequest());
    return axios.post('https://ah-backend-kronos-staging.herokuapp.com/api/users/', newUser, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        dispatch(registerUserSuccess(response.data));
        toastSuccess('Account created. Check your email to verify', 'A');
        history.push('/login');
      })
      .catch((error) => {
        dispatch(registerUserFail(error.response.data));
        const errors = error.response.data;
        if (Object.keys(errors.errors).length === 1) {
          toastFailure(Object.values(errors.errors)[0][0], 'A');
        } else {
          toastFailure('Email and username already exist', 'A');
        }
      });
  };
}
