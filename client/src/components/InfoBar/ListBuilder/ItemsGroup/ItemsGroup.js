import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as variables from '../../../../helpers/style-constants';
import Button from '../../../UI/Button/Button';
import Checkbox from '../../../UI/Checkbox/Checkbox';

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Category = styled.h5`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_2};
  font-weight: 600;
  color: ${variables.COLORS.gray_3};
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px auto;
`;

const ItemNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemName = styled.h5`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_3};
  font-weight: 600;
  color: ${variables.COLORS.black_1};
`;

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
