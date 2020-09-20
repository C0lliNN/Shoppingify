import React from 'react';
import { render } from '@testing-library/react';
import FormGroup from './FormGroup';
import 'jest-styled-components';

describe('<FormGroup/>', () => {
  let errorMessage = null;
  beforeEach(() => {
    console.error = jest.fn((message) => (errorMessage = message));
  });
  it('should console.error if no children elements are provided', () => {
    render(<FormGroup></FormGroup>);

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*children.*required.*/);
  });
  it('should render a input correctly if no label is provided', () => {
    const { container } = render(
      <FormGroup>
        <FormGroup.Input placeholder="test" />
      </FormGroup>
    );

    expect(container).toMatchSnapshot();
  });
  it('should render a textarea correctly if no label is provided', () => {
    const { container } = render(
      <FormGroup>
        <FormGroup.Textarea placeholder="test"></FormGroup.Textarea>
      </FormGroup>
    );

    expect(container).toMatchSnapshot();
  });
  it('should render a select correctly if no label is provided', () => {
    const { container } = render(
      <FormGroup>
        <FormGroup.Select>
          <option value="1">Test</option>
        </FormGroup.Select>
      </FormGroup>
    );

    expect(container).toMatchSnapshot();
  });
  it('should render a input correctly if a label is provided', () => {
    const { container } = render(
      <FormGroup>
        <FormGroup.Label>Test</FormGroup.Label>
        <FormGroup.Input placeholder="test" />
      </FormGroup>
    );

    expect(container).toMatchSnapshot();
  });
  it('should render a textarea correctly if a label is provided', () => {
    const { container } = render(
      <FormGroup>
        <FormGroup.Label>Test</FormGroup.Label>
        <FormGroup.Textarea placeholder="test"></FormGroup.Textarea>
      </FormGroup>
    );

    expect(container).toMatchSnapshot();
  });
  it('should render a select correctly if a label is provided', () => {
    const { container } = render(
      <FormGroup>
        <FormGroup.Label>Test</FormGroup.Label>
        <FormGroup.Select>
          <option value="1">Test</option>
        </FormGroup.Select>
      </FormGroup>
    );

    expect(container).toMatchSnapshot();
  });
});
