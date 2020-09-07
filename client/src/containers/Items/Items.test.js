import React from 'react';
import { render, getByTextWithMarkup } from '../../tests/utilities';
import Items from './Items';
import axios from 'axios';
import { waitForElement } from '@testing-library/react';
import 'jest-styled-components';

function exec() {
  return render(<Items />);
}

jest.mock('axios');

describe('<Items/>', () => {
  beforeEach(() => {
    axios.create.mockImplementation(() => ({
      get: jest.fn().mockResolvedValue({
        data: [
          {
            _id: '5f5543b2267b3e04c0a91680',
            name: 'Apple',
            note: '',
            image: '',
            category: { _id: '5f5543ab267b3e04c0a9167f', name: 'Fruit' },
            user: '5f528e6790213f0b78431156',
            __v: 0,
          },
          {
            _id: '5f5543ab267b3e04c0a9167e',
            name: 'Banana',
            note: '',
            image: '',
            category: { _id: '5f5543ab267b3e04c0a9167f', name: 'Fruit' },
            user: '5f528e6790213f0b78431156',
            __v: 0,
          },
        ],
      }),
    }));
  });
  it('should render correctly', async () => {
    const { container, getByText } = exec();

    await waitForElement(() => getByText('Apple'));
    expect(container).toMatchSnapshot();
  });
  it('should display the Title the title', () => {
    const { getByText } = exec();

    const element = getByTextWithMarkup(
      getByText,
      'Shoppingify allows you take your shopping list wherever you go'
    );

    expect(element).not.toBeNull();
  });
  it('should display the category', async () => {
    const { getByText } = exec();

    await waitForElement(() => getByText('Fruit'));
  });
  it('should display all items', async () => {
    const { getByText } = exec();

    await waitForElement(() => getByText('Apple'));
    expect(getByText('Banana')).not.toBeNull();
  });
});
