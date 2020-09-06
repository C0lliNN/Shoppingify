import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';
import 'jest-styled-components';

describe('<ErrorMessage/>', () => {
  it('should render correctly', () => {
    const { container, getByText } = render(
      <ErrorMessage message="Invalid Email" />
    );
    expect(getByText('Invalid Email')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
