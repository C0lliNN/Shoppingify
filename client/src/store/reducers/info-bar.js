import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
  contentType: null,
  item: null,
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
    case actionTypes.SHOW_ITEM_DETAILS: {
      draft.contentType = actionTypes.SHOW_ITEM_DETAILS;
      draft.item = action.item;
      break;
    }
    default:

  }
}, initialState);

export default infoBarReducer;
