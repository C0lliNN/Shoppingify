import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

function exec() {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </Provider>
  );
}

describe('<NavBar/>', () => {
  it('should display the logo', () => {
    const { getByAltText } = exec();
    const imgElement = getByAltText('Shopping List Logo');
    expect(imgElement).not.toBeNull();
  });
});
