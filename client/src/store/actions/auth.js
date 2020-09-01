import * as actionTypes from '../actions/actionTypes';
import Axios from 'axios';

function loginStart() {
  return {
    type: actionTypes.LOGIN_START,
  };
}

function loginSuccess(payload) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    ...payload,
  };
}

function loginFailed(error) {
  return {
    type: actionTypes.LOGIN_FAILED,
    error: error,
  };
}

export function loginHandler(email, password) {
  return (dispatch) => {
    dispatch(loginStart());

    Axios.post('/auth', { email: email, password: password })
      .then((response) => {
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loginFailed(error.message));
      });
  };
}
