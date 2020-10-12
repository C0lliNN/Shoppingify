import React from 'react';
import { render } from '../../../tests/utilities';
import CartIcon from '.';

describe('<CartIcon/>', () => {
  it('should render correctly', () => {
    const { getByText } = render(<CartIcon />);

    expect(getByText('shopping_cart')).not.toBeNull();
  });
});
