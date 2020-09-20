import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FromGroup from '../UI/FormGroup/FormGroup';
import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

const ListView = styled.ul`
  border: 1px solid ${variables.COLORS.gray_1};
  box-sizing: border-box;
  padding: 12px;
  list-style: none;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-top-left-radius: ${variables.BORDER_RADIUS_1};
  border-bottom-left-radius: ${variables.BORDER_RADIUS_1};
  height: 145px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: ${variables.COLORS.white};
    border-top-right-radius: ${variables.BORDER_RADIUS_1};
    border-bottom-right-radius: ${variables.BORDER_RADIUS_1};
  }

  &::-webkit-scrollbar-thumb {
    background: ${variables.COLORS.gray_1};
    border-radius: ${variables.BORDER_RADIUS_1};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${variables.COLORS.gray_2};
  }

  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    margin-bottom: 100px;
  }
`;

const ListItem = styled.li`
  font-size: ${variables.FONT_SIZE_3};
  line-height: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: ${variables.BORDER_RADIUS_1};
  font-weight: 500;
  font-family: ${variables.FONT_FAMILY};
  color: ${variables.COLORS.gray_3};
  cursor: pointer;
  &:hover,
  &:active {
    background-color: #f2f2f2;
    color: ${variables.COLORS.black_1};
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
    .filter((category) => category && category.name)
    .filter(
      (category) =>
        !categoryValue ||
        category.name.toLowerCase().includes(categoryValue.toLowerCase())
    )
    .map((category) => (
      <ListItem
        key={category._id}
        onClick={() => handleListItemClick(category.name)}
      >
        {category.name}
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
