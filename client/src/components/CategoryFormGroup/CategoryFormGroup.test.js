import React from 'react';
import { render } from '@testing-library/react';
import CategoryFormGroup from './CategoryFormGroup';
import 'jest-styled-components';

let categories = null;
let categoryValue = null;
let setCategoryValue = null;

let errorMessage = null;
beforeEach(() => {
  categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
  categoryValue = '';
  setCategoryValue = jest.fn();

  console.error = jest.fn((message) => (errorMessage = message));
});

function exec() {
  return render(
    <CategoryFormGroup
      categories={categories}
      categoryValue={categoryValue}
      setCategoryValue={setCategoryValue}
    />
  );
}

describe('<CategoryFormGroup/>', () => {
  it('should throw an error if categories is not defined', () => {
    categories = null;

    expect(() => exec()).toThrowError();
  });
  it('should throw an erro if categories is not an array', () => {
    categories = 'category';

    expect(() => exec()).toThrowError();
  });
  it('should console.error if categoryValue is not defined', () => {
    categoryValue = null;

    exec();

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*value.*/i);
  });
  it('should console.error if setCategoryValue is not defined', () => {
    setCategoryValue = null;

    exec();

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*setCategory.*required.*/i);
  });
  it('should console.error if setCategoryValue is not a function', () => {
    setCategoryValue = true;

    exec();

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*invalid.*setCategory.*/i);
  });
  it('should render correctly', () => {
    const { container } = exec();

    expect(console.error).not.toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
