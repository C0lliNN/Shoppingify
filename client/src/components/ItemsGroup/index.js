import PropTypes from 'prop-types';
import React from 'react';
import { showItemDetails, addItemToList } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { Title, Items, Card, Item, Icon } from './styles';

function ItemsGroup({ category, items }) {
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: '50px' }}>
      <Title>{category.name}</Title>
      <Items>
        {items.map((item) => (
          <Card key={item._id}>
            <Item onClick={() => dispatch(showItemDetails(item))}>
              {item.name}
            </Item>
            <Icon
              className="material-icons-round"
              onClick={() => dispatch(addItemToList(item))}
            >
              add
            </Icon>
          </Card>
        ))}
      </Items>
    </div>
  );
}

ItemsGroup.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
  items: PropTypes.array,
  showItemDetails: PropTypes.func,
};

export default ItemsGroup;
