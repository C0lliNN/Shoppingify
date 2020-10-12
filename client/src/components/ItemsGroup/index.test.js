import React from 'react';
import { render } from '../../tests/utilities';
import ItemsGroup from '.';
let category = null;
let items = null;
import 'jest-styled-components';

beforeEach(() => {
  category = { name: 'Fruit' };
  items = [
    { _id: '1', name: 'Apple' },
    { _id: '2', name: 'Banana' },
    { _id: '3', name: 'Orange' },
  ];

  console.error = jest.fn();
});

function exec() {
  return render(<ItemsGroup category={category} items={items} />);
}

describe('<ItemsGroup/>', () => {
  it('should throw an error if a category is not defined', () => {
    category = undefined;

    expect(() => exec()).toThrowError();
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

    expect(getByText(category.name)).not.toBeNull();
  });
  it('should display the items', () => {
    const { getByText } = exec();

    items.forEach((item) => {
      expect(getByText(item.name)).not.toBeNull();
    });
  });
});
