import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
  isLoading: false,
  error: null,
  data: [
    {
      category: {
        _id: null,
        name: null,
      },
      items: [
        {
          _id: null,
          name: null,
          note: null,
          image: null,
        },
      ],
    },
  ],
};

const itemsDataReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEMS_START:
      draft.isLoading = true;
      break;
    case actionTypes.GET_ITEMS_SUCCESS:
      draft.data = action.data;
      draft.error = null;
      draft.isLoading = false;
      break;
    case actionTypes.GET_ITEMS_FAILED:
      draft.isLoading = false;
      draft.error = action.error;
      break;
    case actionTypes.ADD_ITEM: {
      const { item } = action;

      const groupIndex = draft.data.findIndex(
        (groupItem) => groupItem.category._id === item.category._id
      );

      if (groupIndex >= 0) {
        draft.data[groupIndex].items.push(item);
      } else {
        draft.data.push({
          category: item.category,
          items: [item],
        });
      }

      break;
    }
    case actionTypes.REMOVE_ITEM: {
      const { item } = action;

      const groupIndex = draft.data.findIndex(
        (groupItem) => groupItem.category._id === item.category._id
      );

      if (groupIndex >= 0) {
        if (draft.data[groupIndex].items.length <= 1) {
          delete draft.data[groupIndex];
        } else {
          const itemIndex = draft.data[groupIndex].items.findIndex(
            (p) => p._id === item._id
          );
          draft.data[groupIndex].items.splice(itemIndex, itemIndex);
        }
      }

      break;
    }
    default:
  }
}, initialState);

export default itemsDataReducer;
