import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import Button from '.';
import { COLORS } from '../../../helpers/style-constants';
import 'jest-styled-components';

describe('<Button/>', () => {
  let errorMessage = null;
  beforeEach(() => {
    console.error = jest.fn((message) => {
      errorMessage = message;
    });
  });
  it('should console.error if the btnType is undefined', () => {
    render(<Button variant="primary">Button</Button>);

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/btnType.*required.*/i);
  });
  it('should console.error if btnType is invalid', () => {
    render(
      <Button btnType="invalid-btnType" variant="primary">
        Button
      </Button>
    );

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/invalid.*btnType.*/i);
  });
  it('should console.error if variant is invalid', () => {
    render(
      <Button btnType="raised" variant="invalid-variant">
        Button
      </Button>
    );

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/invalid.*variant.*/i);
  });
  it('should render correctly when the type is raised and the variant is valid', () => {
    Object.keys(COLORS).forEach((color) => {
      const { container } = render(
        <Button btnType="raised" variant={color}>
          Button
        </Button>
      );
      expect(container).toMatchSnapshot();
      cleanup();
    });
  });
  it('should render correctly when the type is outlined and the variant is valid', () => {
    Object.keys(COLORS).forEach((color) => {
      const { container } = render(
        <Button btnType="outlined" variant={color}>
          Button
        </Button>
      );
      expect(container).toMatchSnapshot();
      cleanup();
    });
  });
  it('should render correctly when the type is flat', () => {
    const { container } = render(<Button btnType="flat">Button</Button>);

    expect(container).toMatchSnapshot();
  });
  it('should execute the function passed through onClick when the button is clicked', () => {
    const handler = jest.fn();

    render(<Button onClick={handler}>Button</Button>);
    screen.queryByText('Button').click();

    expect(handler).toHaveBeenCalled();
  });
});
