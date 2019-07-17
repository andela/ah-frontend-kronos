import axios from 'axios';
import history from '../../utils/history';

import { GOOGLE_AUTHENTICATION, GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAIL } from '../socialLoginTypes';

/**
 * This is a function which returns the googleSuccess action
 * @param {object} - A object parameter type
 * @return {none}
 * @example
 * foo = () => {}
 */
const googleSuccess = resp => ({
  type: GOOGLE_AUTH_SUCCESS,
  payload: resp.data.user,
});

/**
 * This is a function which returns the googleFail action
 * @param {object} - A object parameter type
 * @return {none}
 * @example
 * foo = () => {}
 */
const googleFail = error => ({
  type: GOOGLE_AUTH_FAIL,
  payload: error.response.data.errors,
});

/**
 * This is a function which sends google registration token to the api
 * @param {string} - A string param
 * @return {none}
 * @example
 * foo = (string) => {}
 */
const LoginGoogle = token => (dispatch) => {
  dispatch({
    type: GOOGLE_AUTHENTICATION,
  });
  // @type {object}
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  // @type {object}
  const userData = {
    access_token: token,
  };
  return axios
    .post(
      'https://ah-backend-kronos-staging.herokuapp.com/api/social-auth/google/',
      userData,
      config,
    )
    .then((resp) => {
      sessionStorage.setItem('token', resp.data.user.token);
      sessionStorage.setItem('user_email', resp.data.user.email);
      sessionStorage.setItem('isLoggedIn', true);
      dispatch(googleSuccess(resp));

      history.push('/articles');
    })
    .catch((error) => {
      dispatch(googleFail(error));
    });
};

export default LoginGoogle;
