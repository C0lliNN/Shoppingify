import React from 'react';
import { render } from '@testing-library/react';
import Title from './Title';
import getByTextWithMarkup from '../../helpers/withMarkup';
import 'jest-styled-components';

describe('<Title/>', () => {
  it('should render correctly', () => {
    const { container } = render(<Title />);
    expect(container).toMatchSnapshot();
  });
  it('should display the title text', () => {
    const { getByText } = render(<Title />);

    const element = getByTextWithMarkup(
      getByText,
      'Shoppingify allows you take your shopping list wherever you go'
    );

    expect(element).not.toBeNull();
  });
});
