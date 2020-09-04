import * as actionTypes from '../actions/actionTypes';

const initialState = {
  saved: false,
  name: 'Shopping List',
  itemsGroup: [
    {
      category: {
        id: '',
        name: '',
      },
      items: [{ id: '', name: '', quantity: 0, checked: false }],
    },
  ],
};

function activeListReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_LIST_NAME: {
      return {
        ...state,
        name: action.newName,
      };
    }
    case actionTypes.LIST_ADD_ITEM: {
      return {
        ...state,
        itemsGroup: state.itemsGroup.concat([action.item]),
      };
    }

    default:
      return state;
  }
}

export default activeListReducer;
