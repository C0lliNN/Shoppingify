import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';
import 'jest-styled-components';

describe('<SearchBar/>', () => {
  it('should render correctly', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });
});
