import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { IS_SUBMITTING_RESET_PASSWORD, SUBMITTING_RESET_PASSWORD_SUCCESS, SUBMITTING_RESET_PASSWORD_FAIL } from './actionTypes';

const apiUrl = 'https://ah-backend-kronos-staging.herokuapp.com/api/password_reset/';


function resetPasswordAction(userEmail) {
  const loginUser = (dispatch) => {
    dispatch({
      type: IS_SUBMITTING_RESET_PASSWORD,
    });
    axios.post(apiUrl, userEmail)
      .then((response) => {
        toast.success('Done! Check your inbox for the password reset link', {
          containerId: 'A',
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
          hideProgressBar: false,
        });
        dispatch({
          type: SUBMITTING_RESET_PASSWORD_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: SUBMITTING_RESET_PASSWORD_FAIL,
          payload: error.response.data,
        });
        const { errors } = error.response.data;
        errors.email.forEach((err) => {
          toast.error(`${err}`, {
            containerId: 'A',
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
            hideProgressBar: false,
          });
        });
      });
  };
  return loginUser;
}

export default resetPasswordAction;
