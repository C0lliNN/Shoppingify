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

      console.log(data);

      return data;
    }
    case actionTypes.REMOVE_ITEM:
      return state.filter((item) => item._id !== action.itemId);
    default:
      return state;
  }
}

export default itemsDataReducer;
