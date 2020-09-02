import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FromGroup from '../UI/FormGroup/FormGroup';
import styled from 'styled-components';
import {
  COLORS,
  BORDER_RADIUS_1,
  FONT_SIZE_3,
  FONT_FAMILY,
} from '../../helpers/style-constants';

const ListView = styled.ul`
  border: 1px solid ${COLORS.gray_1};
  box-sizing: border-box;
  padding: 12px;
  list-style: none;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-top-left-radius: ${BORDER_RADIUS_1};
  border-bottom-left-radius: ${BORDER_RADIUS_1};
  height: 145px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: ${COLORS.white};
    border-top-right-radius: ${BORDER_RADIUS_1};
    border-bottom-right-radius: ${BORDER_RADIUS_1};
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.gray_1};
    border-radius: ${BORDER_RADIUS_1};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.gray_2};
  }
`;

const ListItem = styled.li`
  font-size: ${FONT_SIZE_3};
  line-height: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: ${BORDER_RADIUS_1};
  font-weight: 500;
  font-family: ${FONT_FAMILY};
  color: ${COLORS.gray_3};
  cursor: pointer;
  &:hover,
  &:active {
    background-color: #f2f2f2;
    color: ${COLORS.black_1};
  }
`;

function CategoryFormGroup({ categories, categoryValue, setCategoryValue }) {
  const [showListView, setShowListView] = useState(false);

  function handleInputBlur() {
    setTimeout(() => setShowListView(false), 100);
  }

  function handleInputFocus() {
    setShowListView(true);
  }

  function handleListItemClick(item) {
    setCategoryValue(item);
  }

  const listItems = categories
    .filter(
      (category) =>
        !categoryValue ||
        category.toLowerCase().includes(categoryValue.toLowerCase())
    )
    .map((category) => (
      <ListItem key={category} onClick={() => handleListItemClick(category)}>
        {category}
      </ListItem>
    ));

  return (
    <React.Fragment>
      <FromGroup>
        <FromGroup.Label htmlFor="category">Category</FromGroup.Label>
        <FromGroup.Input
          id="category"
          placeholder="Enter a Category"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={categoryValue}
          onChange={(event) => setCategoryValue(event.target.value)}
        />
      </FromGroup>
      <ListView style={{ visibility: showListView ? 'inherit' : 'hidden' }}>
        {listItems}
      </ListView>
    </React.Fragment>
  );
}

CategoryFormGroup.propTypes = {
  categories: PropTypes.array.isRequired,
  categoryValue: PropTypes.string.isRequired,
  setCategoryValue: PropTypes.func.isRequired,
};

export default CategoryFormGroup;
