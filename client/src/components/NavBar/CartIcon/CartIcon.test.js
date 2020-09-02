import React from 'react';
import { render } from '@testing-library/react';
import CartIcon from './CartIcon';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../../store';

describe('<CartIcon/>', () => {
  it('should render correctly', () => {
    expect(() =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CartIcon />
          </BrowserRouter>
        </Provider>
      )
    ).not.toThrowError();
  });
});
