import React from 'react';
import Badge from './Badge';
import { render, cleanup } from '@testing-library/react';
import { COLORS } from '../../../helpers/style-constants';
import 'jest-styled-components';

describe('<Badge/>', () => {
  let errorMessage = null;
  beforeEach(() => {
    console.error = jest.fn((message) => (errorMessage = message));
  });
  it('should console.error if no children is defined', () => {
    render(<Badge variant="primary"></Badge>);

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*children.*required.*/i);
  });
  it('should console.error if the variant is defined', () => {
    render(<Badge>completed</Badge>);

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*variant.*required.*/i);
  });
  it('should console.error if the variant is invalid', () => {
    render(<Badge variant="invalid">Completed</Badge>);

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/invalid.*variant.*/i);
  });
  it('should render correctly if the variant is valid', () => {
    Object.keys(COLORS).forEach((color) => {
      const { container } = render(<Badge variant={color}>badge</Badge>);

      expect(container).toMatchSnapshot();

      cleanup();
    });
  });
});

it('should return true', () => {
  expect(true).toBe(true);
});
