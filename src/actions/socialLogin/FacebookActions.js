import axios from 'axios';
import history from '../../utils/history';
import {
  FACEBOOK_AUTHENTICATION,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
} from '../socialLoginTypes';

const facebookSuccess = resp => ({
  type: FACEBOOK_AUTH_SUCCESS,
  payload: resp.data.user,
});

const facebookFail = error => ({
  type: FACEBOOK_AUTH_FAIL,
  payload: error.response.data.errors,
});

/**
 * This is a function which sends facebook registration token to the api
 * @param {string} - A string param
 * @return {none}
 * @example
 * foo = (string) => {}
 */
const LoginFacebook = token => (dispatch) => {
  dispatch({
    type: FACEBOOK_AUTHENTICATION,
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
      'https://ah-backend-kronos-staging.herokuapp.com/api/social-auth/facebook/',
      userData,
      config,
    )
    .then((resp) => {
      sessionStorage.setItem('token', resp.data.user.token);
      sessionStorage.setItem('user_email', resp.data.user.email);
      dispatch(facebookSuccess(resp));

      history.push('/successpage');
    })

    .catch((error) => {
      dispatch(facebookFail(error));
    });
};

export default LoginFacebook;
