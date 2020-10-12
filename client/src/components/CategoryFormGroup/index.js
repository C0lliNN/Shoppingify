import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FromGroup from '../UI/FormGroup/FormGroup';
import { ListView, ListItem } from './styles';

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
      {!!listItems.length && (
        <ListView style={{ visibility: showListView ? 'inherit' : 'hidden' }}>
          {listItems}
        </ListView>
      )}
    </React.Fragment>
  );
}

CategoryFormGroup.propTypes = {
  categories: PropTypes.array.isRequired,
  categoryValue: PropTypes.string.isRequired,
  setCategoryValue: PropTypes.func.isRequired,
};

export default CategoryFormGroup;
