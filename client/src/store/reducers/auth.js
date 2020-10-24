import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
  isLoading: false,
  token: null,
  expirationTime: null,
  error: null,
  userName: null,
};

const authReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START: {
      draft.isLoading = true;
      break;
    }
    case actionTypes.LOGIN_SUCCESS: {
      draft.token = action.token;
      draft.expirationTime = action.expirationTime;
      draft.userName = action.name;
      draft.isLoading = false;
      break;
    }
    case actionTypes.LOGIN_FAILED: {
      draft.error = action.error;
      draft.isLoading = false;
      break;
    }
    case actionTypes.SIGNUP_START: {
      draft.isLoading = true;
      break;
    }
    case actionTypes.SIGNUP_SUCCESS: {
      draft.token = action.token;
      draft.expirationTime = action.expirationTime;
      draft.userName = action.name;
      draft.isLoading = false;
      break;
    }
    case actionTypes.SIGNUP_FAILED: {
      draft.error = action.error;
      draft.isLoading = false;
      break;
    }
    case actionTypes.LOGOUT: {
      return initialState;
    }
    default:
  }
}, initialState);

export default authReducer;
