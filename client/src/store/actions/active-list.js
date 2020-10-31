import { toast } from 'react-toastify';
import api from '../../services/api';
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

function saveListStart() {
  return {
    type: actionTypes.SAVE_LIST_START,
  };
}

function saveListSuccess(name, _id) {
  return {
    type: actionTypes.SAVE_LIST_SUCCESS,
    name,
    _id,
  };
}

function saveListFailed(error) {
  return {
    type: actionTypes.SAVE_LIST_FAILED,
    error,
  };
}

export function saveListHandler(name) {
  return async (dispatch, getState) => {
    dispatch(saveListStart());
    try {
      const { activeList } = getState();
      const payload = {
        name,
        items: activeList.data
          .filter((p) => p.category._id)
          .reduce(
            (prev, current) =>
              prev.concat(
                current.items.map((i) => ({
                  _id: i._id,
                  name: i.name,
                  category: i.category,
                  quantity: i.quantity,
                }))
              ),
            []
          ),
        status: 'active',
      };

      const { data } = await api.post('/lists', payload);
      dispatch(saveListSuccess(name, data._id));
      toast('✅ List saved successfully!');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(saveListFailed(errorMessage));
      toast(`❗️Error: ${errorMessage}`);
    }
  };
}

function getActiveListStart() {
  return {
    type: actionTypes.GET_ACTIVE_LIST_START
  }
}

function getActiveListSuccess(data) {
  return {
    type: actionTypes.GET_ACTIVE_LIST_SUCCESS,
    data
  }
}

function getActiveListFailed(error) {
  return {
    type: actionTypes.GET_ACTIVE_LIST_FAILED,
    error
  }
}

export function getActiveListHandler() {
  return async (dispatch) => {
    dispatch(getActiveListStart());
    try {
      const response = await api.get('/lists/active');

      let lastItem = null;

      const itemsGroupData = [];

      for (const item of response.data.items) {
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

      const data = {
        _id: response.data._id,
        data: itemsGroupData,
        name: response.data.name
      }

      dispatch(getActiveListSuccess(data));

    } catch(error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
        dispatch(getActiveListFailed(errorMessage));
    }
  }
}

function completeListStart() {
  return {
    type: actionTypes.COMPLETE_LIST_START,
  };
}

function completeListSuccess() {
  return {
    type: actionTypes.COMPLETE_LIST_SUCCESS,
  };
}

function completeListFailed(error) {
  return {
    type: actionTypes.COMPLETE_LIST_FAILED,
    error,
  };
}

export function completeListHandler() {
  return async (dispatch, getState) => {
    dispatch(completeListStart());

    try {
      const { _id: listId } = getState().activeList;
      await api.patch(`/lists/${listId}/complete`);
      dispatch(completeListSuccess());
      toast('✅ List completed successfully!');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(completeListFailed(errorMessage));
      toast(`❗️Error: ${errorMessage}`);
    }
  };
}

function cancelListStart() {
  return {
    type: actionTypes.CANCEL_LIST_START
  }
}

function cancelListSuccess() {
  return {
    type: actionTypes.CANCEL_LIST_SUCCESS
  }
}

function cancelListFailed() {
  return {
    type: actionTypes.CANCEL_LIST_FAILED
  }
}

export function cancelListHandler() {
  return async (dispatch, getState) => {
    dispatch(cancelListStart());

    try {
      const { _id: listId } = getState().activeList;
      await api.patch(`/lists/${listId}/cancel`);
      dispatch(cancelListSuccess());
      toast('✅ List canceled successfully!');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(cancelListFailed(errorMessage));
      toast(`❗️Error: ${errorMessage}`);
    }
  };
}