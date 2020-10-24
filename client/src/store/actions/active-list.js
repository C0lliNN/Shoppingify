import * as actionTypes from './actionTypes';

export function addItem(item) {
  return {
    type: actionTypes.LIST_ADD_ITEM,
    item,
  };
}

export function incrementItem(item) {
  return {
    type: actionTypes.INCREMENT_ITEM_QUANTITY,
    item,
  };
}

export function decrementItem(item) {
  return {
    type: actionTypes.DECREMENT_ITEM_QUANTITY,
    item,
  };
}

export function removeItemFromList(item) {
  return {
    type: actionTypes.LIST_REMOVE_ITEM,
    item,
  };
}
