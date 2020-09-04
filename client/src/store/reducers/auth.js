import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  token: null,
  expiresIn: null,
  error: null,
  userName: null,
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
        userName: action.name,
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
        userName: action.name,
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
      return initialState;
    }
    default:
      return state;
  }
}

export default authReducer;
