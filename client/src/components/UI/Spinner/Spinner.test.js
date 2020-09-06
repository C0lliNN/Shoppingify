import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';
import 'jest-styled-components';

describe('<Spinner/>', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);

    expect(container).toMatchSnapshot();
  });
});
