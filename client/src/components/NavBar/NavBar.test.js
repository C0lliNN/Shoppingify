import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';

function exec() {
  return render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
}

describe('<NavBar/>', () => {
  it('should display the logo', () => {
    const { getByAltText } = exec();
    const imgElement = getByAltText('Shopping List Logo');
    expect(imgElement).not.toBeNull();
  });
});
