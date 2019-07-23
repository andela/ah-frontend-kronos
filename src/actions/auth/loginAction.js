import axios from 'axios';
import { toast } from 'react-toastify';
import { LoginConstants } from '../actionTypes';
import history from '../../utils/history';
import { toastSuccess, toastFailure } from '../../utils/toast';

const apiUrl = 'https://ah-backend-kronos-staging.herokuapp.com/api/users/login/';


const loginUserAction = userData => dispatch => axios.post(apiUrl, userData)
  .then((response) => {
    dispatch({
      type: LoginConstants.LOGIN_USER_SUCCESS,
      payload: response.data,
    });
    toast.dismiss();
    toastSuccess(`Welcome ${response.data.user.username}. Login Successful`, 'A');
    sessionStorage.setItem('token', response.data.user.auth_token);
    sessionStorage.setItem('username', response.data.user.username);
    sessionStorage.setItem('isLoggedIn', true);
    history.push('/articles');
  })
  .catch((error) => {
    dispatch({
      type: LoginConstants.LOGIN_USER_FAILED,
      payload: error.response.data,
    });
    if (error.response.data) {
      toast.dismiss();
      toastFailure(`${error.response.data.errors.error[0]}`, 'A');
    }
  });

export default loginUserAction;
