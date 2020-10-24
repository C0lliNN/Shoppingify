import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  ItemContainer,
  ItemNameContainer,
  ItemName,
  EditContainer,
} from './styles';
import Button from '../../../../UI/Button';
import Checkbox from '../../../../UI/Checkbox';
import { useDispatch } from 'react-redux';
import { decrementItem, incrementItem, removeItemFromList } from '../../../../../store/actions';

export default function Item({ item, completing }) {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  function handleIncrementItem() {
    dispatch(incrementItem(item));
  }

  function handleDecrementItem() {
    dispatch(decrementItem(item));
  }

  function handleRemoveItem() {
    dispatch(removeItemFromList(item));
  }

  function toggleEditing() {
    setEditing((prevState) => !prevState);
  }

  return (
    <ItemContainer key={item._id}>
      <ItemNameContainer>
        {completing && <Checkbox />}
        <ItemName>{item.name}</ItemName>
      </ItemNameContainer>
      {editing ? (
        <EditContainer>
          <button className="delete" onClick={handleRemoveItem}>
            <span className="material-icons-round">delete_outline</span>
          </button>
          <button className="icon" onClick={handleDecrementItem}>
            <span className="material-icons-round">remove</span>
          </button>
          <Button
            btnType="outlined"
            variant="primary"
            disabled={completing}
            onClick={toggleEditing}
          >
            {item.quantity} pcs
          </Button>
          <button className="icon" onClick={handleIncrementItem}>
            <span className="material-icons-round">add</span>
          </button>
        </EditContainer>
      ) : (
        <Button
          btnType="outlined"
          variant="primary"
          disabled={completing}
          onClick={toggleEditing}
        >
          {item.quantity} pcs
        </Button>
      )}
    </ItemContainer>
  );
}

Item.propTypes = {
  completing: PropTypes.any,
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
  }),
};
