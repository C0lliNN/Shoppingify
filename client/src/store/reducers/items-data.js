import * as actionTypes from '../actions/actionTypes';

const initialState = [
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
];

function itemsDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ITEMS_DATA:
      return action.data;
    case actionTypes.ADD_ITEM: {
      const data = [...state];
      const { item } = action;

      const groupIndex = data.findIndex(
        (groupItem) => groupItem.category._id === item.category._id
      );

      if (groupIndex >= 0) {
        data[groupIndex] = {
          ...data[groupIndex],
          items: data[groupIndex].items.concat([item]),
        };
      } else {
        data.push({
          category: item.category,
          items: [item],
        });
      }

      return data;
    }
    case actionTypes.REMOVE_ITEM: {
      const data = [...state];
      const item = action.item;

      const group = data.find(
        (groupItem) => groupItem.category._id === item.category._id
      );

      if (group) {
        const newItems = group.items.filter((p) => p._id !== item._id);
        group.items = newItems;
      }

      if (!group.items.length) {
        return data.filter((p) => p.category._id !== group.category._id);
      }

      return data;
    }

    default:
      return state;
  }
}

export default itemsDataReducer;
