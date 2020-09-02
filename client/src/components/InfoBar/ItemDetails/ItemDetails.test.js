import React from 'react';
import { render } from '@testing-library/react';
import ItemDetails from './ItemDetails';
import { Provider } from 'react-redux';
import store from '../../../store/index';
import { BrowserRouter } from 'react-router-dom';

const item = {
  name: 'Apple',
  image: 'https://picsum.photos/300/400',
  note: 'Note',
  category: {
    name: 'Fruit',
  },
};

const mockFunction = jest.fn();

function exec() {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ItemDetails item={item} showListBuilder={mockFunction} />
      </BrowserRouter>
    </Provider>
  );
}

describe('<ItemDetails/>', () => {
  it('should show the item image', () => {
    const { getByTitle } = exec();
    const element = getByTitle(item.name);

    expect(element.style.backgroundImage).toMatch(new RegExp(item.image));
  });
  it('should show the item name', () => {
    const { getByText } = exec();

    expect(getByText(item.name)).not.toBeNull();
  });
  it('should show the category', () => {
    const { getByText } = exec();

    expect(getByText(item.category.name)).not.toBeNull();
  });
  it('should show the notes', () => {
    const { getByText } = exec();

    expect(getByText(item.note)).not.toBeNull();
  });
  it('should show a delete button', () => {
    const { getByText } = exec();

    expect(getByText('delete')).not.toBeNull();
  });
  it('should show a add to list button', () => {
    const { getByText } = exec();

    expect(getByText('Add to list')).not.toBeNull();
  });
});
