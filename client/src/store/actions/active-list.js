import * as actionTypes from './actionTypes';

export function changeListName(newName) {
  return {
    type: actionTypes.CHANGE_LIST_NAME,
    newName: newName,
  };
}

export function addItem(item) {
  return {
    type: actionTypes.ADD_ITEM,
    item: item,
  };
}
