import React from 'react';
import { render } from '@testing-library/react';
import InfoBar from './InfoBar';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';

describe('<InfoBar/>', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <InfoBar />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
