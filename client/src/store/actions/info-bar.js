import { toast } from 'react-toastify';
import getAxios from '../../helpers/axios';
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

function showItemDetailsStart() {
  return {
    type: actionTypes.SHOW_ITEM_DETAILS_START,
  };
}

function showItemDetailsSuccess(item) {
  return {
    type: actionTypes.SHOW_ITEM_DETAILS_SUCCESS,
    item: item,
  };
}

function showItemDetailsFailed() {
  return {
    type: actionTypes.SHOW_ITEM_DETAILS_FAILED,
  };
}

export function showItemDetailsHandler(id) {
  return async (dispatch) => {
    dispatch(showItemDetailsStart());
    try {
      const { data } = await getAxios().get(`/items/${id}`);
      dispatch(showItemDetailsSuccess(data));
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      toast(`❗️Error: ${errorMessage}`);
      dispatch(showItemDetailsFailed());
    }
  };
}
