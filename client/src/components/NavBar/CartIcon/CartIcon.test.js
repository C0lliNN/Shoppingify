import React from 'react';
import { render } from '../../../tests/utilities';
import CartIcon from './CartIcon';

describe('<CartIcon/>', () => {
  it('should render correctly', () => {
    expect(() => render(<CartIcon />)).not.toThrowError();
  });
});
