import * as actionTypes from '../actions/actionTypes';

const initialState = {
  contentType: null,
  item: null,
};

function infoBarReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_LIST_BUILDER: {
      return {
        ...state,
        contentType: actionTypes.SHOW_LIST_BUILDER,
      };
    }
    case actionTypes.SHOW_CREATE_ITEM: {
      return {
        ...state,
        contentType: actionTypes.SHOW_CREATE_ITEM,
      };
    }
    case actionTypes.SHOW_ITEM_DETAILS: {
      return {
        ...state,
        contentType: actionTypes.SHOW_ITEM_DETAILS,
        item: action.item,
      };
    }
    default:
      return state;
  }
}

export default infoBarReducer;
