import React from 'react';
import { render } from '@testing-library/react';
import InfoBar from './InfoBar';

describe('<InfoBar/>', () => {
  it('should render correctly', () => {
    const { container } = render(<InfoBar />);
    expect(container).toMatchSnapshot();
  });
});
