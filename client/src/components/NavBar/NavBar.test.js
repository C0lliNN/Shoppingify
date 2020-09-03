import React from 'react';
import { render } from '../../tests/utilities';
import NavBar from './NavBar';

function exec() {
  return render(<NavBar />);
}

describe('<NavBar/>', () => {
  it('should display the logo', () => {
    const { getByAltText } = exec();
    const imgElement = getByAltText('Shopping List Logo');
    expect(imgElement).not.toBeNull();
  });
});
