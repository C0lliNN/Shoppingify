import * as actionTypes from './actionTypes';

export function addItem(item) {
  return {
    type: actionTypes.LIST_ADD_ITEM,
    item: item,
  };
}
