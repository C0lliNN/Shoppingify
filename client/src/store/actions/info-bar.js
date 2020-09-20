import * as actionTypes from './actionTypes';

export function showListBuilder() {
  return {
    type: actionTypes.SHOW_LIST_BUILDER,
  };
}

export function showCreateItem() {
  return {
    type: actionTypes.SHOW_CREATE_ITEM,
  };
}

export function showItemDetails(item) {
  return {
    type: actionTypes.SHOW_ITEM_DETAILS,
    item: item,
  };
}
