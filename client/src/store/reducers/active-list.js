import * as actionTypes from '../actions/actionTypes';

const initialState = {
  saved: false,
  name: '',
  itemsGroup: [
    {
      category: {
        _id: '',
        name: '',
      },
      items: [{ _id: '', name: '', quantity: 0, checked: false }],
    },
  ],
};

function activeListReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LIST_ADD_ITEM: {
      const item = { ...action.item, quantity: 1 };
      const itemsGroup = [...state.itemsGroup];
      const index = itemsGroup.findIndex(
        (p) => p.category._id === item.category._id
      );

      let newItemsGroup = null;

      if (index >= 0) {
        itemsGroup[index].items = itemsGroup[index].items.concat([item]);
        newItemsGroup = itemsGroup;
      } else {
        newItemsGroup = itemsGroup.concat([
          {
            category: item.category,
            items: [item],
          },
        ]);
      }

      return {
        ...state,
        itemsGroup: newItemsGroup,
      };
    }

    default:
      return state;
  }
}

export default activeListReducer;
