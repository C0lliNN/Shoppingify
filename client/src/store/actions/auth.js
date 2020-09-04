import * as actionTypes from '../actions/actionTypes';
import getAxios from '../../helpers/axios';

const TOKEN = 'TOKEN';
const EXPIRATION_TIME = 'EXPIRATION_TIME';
const USER_NAME = 'USER_NAME';

const axios = getAxios();

function loginStart() {
  return {
    type: actionTypes.LOGIN_START,
  };
}

function loginSuccess(payload) {
  setLocalStorage(payload);

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

    axios
      .post('/auth', { email: email, password: password })
      .then((response) => {
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loginFailed(error.message));
      });
  };
}

function signupStart() {
  return {
    type: actionTypes.SIGNUP_START,
  };
}

function signupSuccess(payload) {
  setLocalStorage(payload);

  return {
    type: actionTypes.SIGNUP_SUCCESS,
    ...payload,
  };
}

function signupFailed(error) {
  return {
    type: actionTypes.SIGNUP_FAILED,
    error: error,
  };
}

export function signupHandler(payload) {
  return (dispatch) => {
    dispatch(signupStart());

    axios
      .post('/users', payload)
      .then((response) => {
        dispatch(signupSuccess(response.data));
      })
      .catch((error) => {
        signupFailed(error);
      });
  };
}

export function checkAuth() {
  return (dispatch) => {
    const token = localStorage.getItem(TOKEN);
    const expirationTime = localStorage.getItem(EXPIRATION_TIME);
    const name = localStorage.getItem(USER_NAME);

    if (token && expirationTime && name) {
      const currentDate = new Date();

      const diff = expirationTime - currentDate.getTime();

      if (diff > 0) {
        dispatch(
          loginSuccess({ token: token, name: name, expiresIn: diff / 1000 })
        );
      }

      setTimeout(() => {
        dispatch(logout());
      }, diff);
    }
  };
}

export function logout() {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(EXPIRATION_TIME);
  localStorage.removeItem(USER_NAME);
  return {
    type: actionTypes.LOGOUT,
  };
}

function setLocalStorage(payload) {
  const { token, name, expiresIn } = payload;
  const currentDate = new Date();
  const expirationTime = currentDate.getTime() + expiresIn * 1000;

  localStorage.setItem(TOKEN, token);
  localStorage.setItem(EXPIRATION_TIME, expirationTime);
  localStorage.setItem(USER_NAME, name);
}
