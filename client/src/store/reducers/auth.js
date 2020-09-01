import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  isLoading: false,
  token: null,
  expiresIn: null,
  error: null,
  user: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.token,
        expiresIn: action.expiresIn,
        user: action.user,
        isLoading: false,
      };
    }
    case actionTypes.LOGIN_FAILED: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case actionTypes.SIGNUP_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        token: action.token,
        expiresIn: action.expiresIn,
        user: action.user,
        isLoading: false,
      };
    }
    case actionTypes.SIGNUP_FAILED: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case actionTypes.LOGOUT: {
      return {
        ...state,
        token: null,
        expiresIn: null,
        user: null,
      };
    }
    default:
      return state;
  }
}

export default authReducer;
