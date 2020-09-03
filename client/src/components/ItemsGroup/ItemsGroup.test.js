import React from 'react';
import { render } from '../../tests/utilities';
import ItemsGroup from './ItemsGroup';
let errorMessage = null;
let category = null;
let items = null;

beforeEach(() => {
  console.error = jest.fn((message) => (errorMessage = message));

  category = 'Fruit';
  items = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];
});

function exec() {
  return render(<ItemsGroup category={category} items={items} />);
}

describe('<ItemsGroup/>', () => {
  it('should console.error if a category is not defined', () => {
    category = undefined;

    exec();

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/category/i);
  });
  it('should console.error if items is not an array', () => {
    items = 12;

    expect(() => exec()).toThrowError();
  });
  it('should render correctly', () => {
    const { container } = exec();

    expect(container).toMatchSnapshot();
  });
  it('should display the category', () => {
    const { getByText } = exec();

    expect(getByText(category)).not.toBeNull();
  });
  it('should display the items', () => {
    const { getByText } = exec();

    items.forEach((item) => {
      expect(getByText(item.name)).not.toBeNull();
    });
  });
});
