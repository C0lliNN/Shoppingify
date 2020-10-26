import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
  saved: false,
  name: '',
  isLoading: false,
  error: null,
  data: [
    {
      category: {
        _id: '',
        name: '',
      },
      items: [
        {
          _id: '',
          name: '',
          quantity: 0,
          checked: false,
          category: {
            _id: '',
            name: '',
          },
        },
      ],
    },
  ],
};

const activeListReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.LIST_ADD_ITEM: {
      const item = { ...action.item, quantity: 1 };
      const index = draft.data.findIndex(
        (p) => p.category._id === item.category._id
      );

      if (index >= 0) {
        draft.data[index].items.push(item);
      } else {
        draft.data.push({
          category: item.category,
          items: [item],
        });
      }
      break;
    }
    case actionTypes.INCREMENT_ITEM_QUANTITY: {
      const { item } = action;

      const foundedItem = draft.data
        .find((g) => g.category._id === item.category._id)
        .items.find((i) => i._id === item._id);

      foundedItem.quantity += 1;
      break;
    }
    case actionTypes.DECREMENT_ITEM_QUANTITY: {
      if (action.item.quantity > 1) {
        const { item } = action;

        const foundedItem = draft.data
          .find((g) => g.category._id === item.category._id)
          .items.find((i) => i._id === item._id);

        foundedItem.quantity -= 1;
      }
      break;
    }

    case actionTypes.LIST_REMOVE_ITEM: {
      const { item } = action;
      const groupIndex = draft.data.findIndex(
        (groupItem) => groupItem.category._id === item.category._id
      );

      if (groupIndex >= 0) {
        if (draft.data[groupIndex].items.length <= 1) {
          draft.data.splice(groupIndex, 1);
        } else {
          const itemIndex = draft.data[groupIndex].items.findIndex(
            (p) => p._id === item._id
          );
          draft.data[groupIndex].items.splice(itemIndex, 1);
        }
      }

      break;
    }

    case actionTypes.SAVE_LIST_START: {
      draft.isLoading = true;
      break;
    }

    case actionTypes.SAVE_LIST_SUCCESS: {
      draft.isLoading = false;
      draft.saved = true;
      draft.name = action.name;
      draft._id = action._id;
      break;
    }

    case actionTypes.SAVE_LIST_FAILED: {
      draft.isLoading = false;
      draft.error = action.error;
      break;
    }

    case actionTypes.GET_ACTIVE_LIST_START: {
      draft.isLoading = true;
      break;
    }

    case actionTypes.GET_ACTIVE_LIST_SUCCESS: {
      draft.isLoading = false;
      draft.name = action.data.name;
      draft._id = action.data._id;
      draft.data = action.data.data;
      draft.saved = true;
      break;
    }

    case actionTypes.GET_ACTIVE_LIST_FAILED: {
      draft.isLoading = false;
      draft.error = action.error;
      break;
    }

    case actionTypes.COMPLETE_LIST_START: {
      draft.isLoading = true;
      break;
    }

    case actionTypes.COMPLETE_LIST_SUCCESS: {
      return initialState;
    }

    case actionTypes.COMPLETE_LIST_FAILED: {
      draft.isLoading = false;
      draft.error = action.error;
      break;
    }

    default:
  }
}, initialState);

export default activeListReducer;
