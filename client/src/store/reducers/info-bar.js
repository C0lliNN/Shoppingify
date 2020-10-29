import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
  contentType: null,
  item: null,
  isLoading: false,
};

const infoBarReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LIST_BUILDER: {
      draft.contentType = actionTypes.SHOW_LIST_BUILDER;
      break;
    }
    case actionTypes.SHOW_CREATE_ITEM: {
      draft.contentType = actionTypes.SHOW_CREATE_ITEM;
      break;
    }
    case actionTypes.SHOW_ITEM_DETAILS_START: {
      draft.contentType = actionTypes.SHOW_ITEM_DETAILS;
      draft.isLoading = true;
      break;
    }
    case actionTypes.SHOW_ITEM_DETAILS_SUCCESS: {
      draft.item = action.item;
      draft.isLoading = false;
      break;
    }
    case actionTypes.SHOW_ITEM_DETAILS_FAILED: {
      draft.item = null;
      draft.isLoading = false;
      draft.contentType = actionTypes.SHOW_LIST_BUILDER;
      break;
    }
    default:

  }
}, initialState);

export default infoBarReducer;
