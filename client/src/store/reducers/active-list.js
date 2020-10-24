import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
  saved: false,
  data: [
    {
      category: {
        _id: '',
        name: '',
      },
      items: [{ _id: '', name: '', quantity: 0, checked: false }],
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

    default:
  }
}, initialState);

export default activeListReducer;
