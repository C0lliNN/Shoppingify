import * as actionTypes from '../actions/actionTypes';
import api from '../../services/api';

function loginStart() {
  return {
    type: actionTypes.LOGIN_START,
  };
}

function loginSuccess(payload) {
  const currentDate = new Date();
  const expirationTime = currentDate.getTime() + payload.expiresIn * 1000;

  setAuthorization(payload.token);

  return {
    type: actionTypes.LOGIN_SUCCESS,
    ...payload,
    expirationTime,
  };
}

function loginFailed(error) {
  return {
    type: actionTypes.LOGIN_FAILED,
    error: error,
  };
}

export function loginHandler(email, password) {
  return async (dispatch) => {
    dispatch(loginStart());

    try {
      const { data } = await api.post('/auth', {
        email: email,
        password: password,
      });
      dispatch(loginSuccess(data));
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(loginFailed(errorMessage));
    }
  };
}

function signupStart() {
  return {
    type: actionTypes.SIGNUP_START,
  };
}

function signupSuccess(payload) {
  setAuthorization(payload.token);
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
  return async (dispatch) => {
    dispatch(signupStart());

    try {
      const { data } = await api.post('/users', payload);

      dispatch(signupSuccess(data));
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(signupFailed(errorMessage));
    }
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}

export function checkAuth() {
  return (dispatch, getState) => {
    const { auth } = getState();
    const { token, expirationTime } = auth;

    if (token && expirationTime) {
      const currentDate = new Date();

      const diff = expirationTime - currentDate.getTime();

      setAuthorization(token);

      setTimeout(() => {
        dispatch(logout());
      }, diff);
    }
  };
}

function setAuthorization(token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}