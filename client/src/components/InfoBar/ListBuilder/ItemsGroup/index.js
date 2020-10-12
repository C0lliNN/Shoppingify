import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../../UI/Button/Button';
import Checkbox from '../../../UI/Checkbox';
import {
  Wrapper,
  Category,
  ItemContainer,
  ItemNameContainer,
  ItemName,
} from './styles';

function ItemsGroup({ group, completing }) {
  return (
    <Wrapper>
      <Category>{group.category.name}</Category>
      {group.items.map((item) => (
        <ItemContainer key={item._id}>
          <ItemNameContainer>
            {!completing && <Checkbox />}
            <ItemName>{item.name}</ItemName>
          </ItemNameContainer>
          <Button btnType="outlined" variant="primary" disabled={!completing}>
            {item.quantity} pcs
          </Button>
        </ItemContainer>
      ))}
    </Wrapper>
  );
}

ItemsGroup.propTypes = {
  completing: PropTypes.bool.isRequired,
  group: PropTypes.shape({
    category: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        note: PropTypes.string,
        image: PropTypes.string,
        quantity: PropTypes.number,
        category: PropTypes.object,
      })
    ),
  }).isRequired,
};

export default ItemsGroup;
