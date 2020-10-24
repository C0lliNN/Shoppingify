import PropTypes from 'prop-types';
import React, { useState, forwardRef } from 'react';
import { ValidationError } from '../InfoBar/CreateItem/styles';
import FromGroup from '../UI/FormGroup';
import { ListView, ListItem } from './styles';

const CategoryFormGroup = forwardRef(({ categories, errors }, ref) => {
  const [showListView, setShowListView] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');

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
          ref={ref}
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
          name="category"
          autoComplete="off"
        />
        {errors?.category && (
          <ValidationError>{errors?.category.message}</ValidationError>
        )}
      </FromGroup>
      {!!listItems.length && (
        <ListView style={{ visibility: showListView ? 'inherit' : 'hidden' }}>
          {listItems}
        </ListView>
      )}
    </React.Fragment>
  );
});

CategoryFormGroup.propTypes = {
  categories: PropTypes.array,
  errors: PropTypes.shape({
    category: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};

CategoryFormGroup.displayName = 'CategoryFromGroup';

export default CategoryFormGroup;
