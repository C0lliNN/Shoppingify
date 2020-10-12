import React from 'react';
import { render } from '../../../tests/utilities';
import ItemDetails from '.';
import axios from 'axios';
import Items from '../../../containers/Items/Items';
import {
  fireEvent,
  waitForElementToBeRemoved,
  waitForElement,
} from '@testing-library/react';

const item = {
  _id: '1',
  name: 'Apple',
  image: 'https://picsum.photos/300/400',
  note: 'Note',
  category: {
    _id: '2',
    name: 'Fruit',
  },
};

jest.mock('axios');

const mockFunction = jest.fn();

function exec() {
  return render(
    <>
      <Items />
      <ItemDetails item={item} showListBuilder={mockFunction} />
    </>
  );
}

describe('<ItemDetails/>', () => {
  beforeEach(() => {
    axios.create.mockImplementation(() => ({
      get: jest.fn().mockResolvedValue({ data: [item] }),
      delete: jest.fn().mockResolvedValue({ data: '' }),
    }));
  });

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
  it('should be able to delete the item', async () => {
    const { getByText } = exec();

    await waitForElement(() => getByText('add'));

    fireEvent.click(getByText('delete'));
    fireEvent.click(getByText('Yes'));

    await waitForElementToBeRemoved(() => getByText('add'));
  });
});
