import React from 'react';
import { render } from '@testing-library/react';
import ButtonBar from './index';
import Button from '../UI/Button';
import 'jest-styled-components';

describe('<ButtonBar/>', () => {
  it('should render correctly', () => {
    const { container, getByText } = render(
      <ButtonBar>
        <Button btnType="raised" variant="primary">
          OK
        </Button>
      </ButtonBar>
    );

    expect(getByText('OK')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
