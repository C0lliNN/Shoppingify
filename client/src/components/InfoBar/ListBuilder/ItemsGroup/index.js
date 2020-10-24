import PropTypes from 'prop-types';
import React from 'react';
import Item from './Item';
import {
  Wrapper,
  Category,
} from './styles';

function ItemsGroup({ group, completing }) {
  return (
    <Wrapper>
      <Category>{group.category.name}</Category>
      {group.items.map((item) => (
        <Item key={item._id} item={item} completing={completing}/>
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
