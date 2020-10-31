import * as actionTypes from './actionTypes';
import api from '../../services/api';

function getItemsStart() {
  return {
    type: actionTypes.GET_ITEMS_START,
  };
}

function getItemsSuccess(data) {
  return {
    type: actionTypes.GET_ITEMS_SUCCESS,
    data,
  };
}

function getItemsFailed(error) {
  return {
    type: actionTypes.GET_ITEMS_FAILED,
    error,
  };
}

export function getItemsData() {

  return async (dispatch) => {
    dispatch(getItemsStart());

    try {
      const response = await api.get('/items');

      let lastItem = null;

      const itemsGroupData = [];

      for (const item of response.data) {
        if (!lastItem || lastItem.category._id !== item.category._id) {
          itemsGroupData.push({
            category: item.category,
            items: [item],
          });
        } else {
          const lastIndex = itemsGroupData.length - 1;
          itemsGroupData[lastIndex].items.push(item);
        }

        lastItem = item;
      }

      dispatch(getItemsSuccess(itemsGroupData));
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;

      dispatch(getItemsFailed(errorMessage));
    }
  };
}

export function addItem(item) {
  return {
    type: actionTypes.ADD_ITEM,
    item: item,
  };
}

export function removeItem(item) {
  return {
    type: actionTypes.REMOVE_ITEM,
    item: item,
  };
}
