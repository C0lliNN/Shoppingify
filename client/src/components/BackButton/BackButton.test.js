import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BackButton from './BackButton';
import 'jest-styled-components';

describe('<BackButton/>', () => {
  it('should render correctly', () => {
    const { container } = render(<BackButton onClick={() => {}} />);
    expect(container).toMatchSnapshot();
  });
  it('should execute the onClick function when the the button is clicked', () => {
    const fn = jest.fn();
    const { getByText } = render(<BackButton onClick={fn} />);

    const element = getByText('back');
    fireEvent.click(element);

    expect(fn).toHaveBeenCalled();
  });
});
