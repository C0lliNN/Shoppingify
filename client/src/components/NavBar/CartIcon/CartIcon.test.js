import React from 'react';
import { render } from '@testing-library/react';
import CartIcon from './CartIcon';

describe('<CartIcon/>', () => {
  it('should render correctly', () => {
    expect(() => render(<CartIcon />)).not.toThrowError();
  });
});
