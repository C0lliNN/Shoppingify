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
  it('should display the item link', () => {
    const { getByText } = exec();

    expect(getByText('toc')).not.toBeNull();
  });
  it('should display the history link', () => {
    const { getByText } = exec();

    expect(getByText('refresh')).not.toBeNull();
  });
  it('should display the statistics link', () => {
    const { getByText } = exec();

    expect(getByText('insert_chart_outlined')).not.toBeNull();
  });
  it('should display the logout link', () => {
    const { getByText } = exec();

    expect(getByText('power_settings_new')).not.toBeNull();
  });
});
