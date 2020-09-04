import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';
import { showItemDetails } from '../../store/actions';
import { connect } from 'react-redux';

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
  margin-left: 5px;
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    width: 120px;
    margin-left: 15px;
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

function ItemsGroup({ category, items, showItemDetails }) {
  return (
    <div style={{ marginTop: '50px' }}>
      <Title>{category.name}</Title>
      <Items>
        {items.map((item) => (
          <Card key={item._id}>
            <Item onClick={() => showItemDetails(item)}>{item.name}</Item>
            <Icon className="material-icons-round">add</Icon>
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

const mapDispatchToProps = {
  showItemDetails,
};

export default connect(null, mapDispatchToProps)(ItemsGroup);
