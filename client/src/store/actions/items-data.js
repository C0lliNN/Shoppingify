import * as actionTypes from './actionTypes';
import getAxios from '../../helpers/axios';

export function getItemsData() {
  const axios = getAxios();

  return (dispatch) => {
    axios
      .get('/itens')
      .then((response) => {
        let lastItem = null;

        const itemsGroupData = [];

        for (const item of response.data) {
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

        dispatch({ type: actionTypes.GET_ITEMS_DATA, data: itemsGroupData });
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export function addItem(item) {
  return {
    type: actionTypes.ADD_ITEM,
    item: item,
  };
}
