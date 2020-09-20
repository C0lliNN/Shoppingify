import * as actionTypes from '../actions/actionTypes';

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

function itemsDataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ITEMS_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_ITEMS_SUCCESS:
      return {
        data: action.data,
        error: null,
        isLoading: false,
      };
    case actionTypes.GET_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionTypes.ADD_ITEM: {
      const data = [...state.data];
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

      return {
        ...state,
        data,
      };
    }
    case actionTypes.REMOVE_ITEM: {
      let data = [...state.data];
      const item = action.item;

      const group = data.find(
        (groupItem) => groupItem.category._id === item.category._id
      );

      if (group) {
        const newItems = group.items.filter((p) => p._id !== item._id);
        group.items = newItems;
      }

      if (!group.items.length) {
        data = data.filter((p) => p.category._id !== group.category._id);
      }

      return {
        ...state,
        data,
      };
    }

    default:
      return state;
  }
}

export default itemsDataReducer;
