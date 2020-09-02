import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

const Title = styled.h3`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_3};
  color: ${variables.COLORS.black_1};
  margin-top: 0px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: ${variables.COLORS.white};
  border-radius: ${variables.BORDER_RADIUS_1};
  font-size: ${variables.FONT_SIZE_2};
  font-weight: 600;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  margin-bottom: 15px;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    width: 120px;
    margin-bottom: 30px;
    font-size: ${variables.FONT_SIZE_3};
  }
`;

const Item = styled.span`
  cursor: pointer;
`;

const Icon = styled.i`
  font-size: ${variables.FONT_SIZE_3};
  color: #c1c1c4;
  cursor: pointer;
`;

function ItemsGroup({ category, items }) {
  return (
    <div style={{ marginTop: '50px' }}>
      <Title>{category}</Title>
      <Items>
        {items.map((item) => (
          <Card key={item.name}>
            <Item>{item.name}</Item>
            <Icon className="material-icons-round">add</Icon>
          </Card>
        ))}
      </Items>
    </div>
  );
}

ItemsGroup.propTypes = {
  category: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default ItemsGroup;
