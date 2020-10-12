import React from 'react';
import { useState } from 'react';
import SaveBar from './index.js.js';
import 'jest-styled-components';
import { render, fireEvent } from '@testing-library/react';

let disabled;
const onSave = jest.fn();

const Wrapper = () => {
  const [name, setName] = useState('');

  return (
    <SaveBar
      onSave={onSave}
      disabled={disabled}
      name={name}
      setName={setName}
    />
  );
};

function exec() {
  return render(<Wrapper />);
}

describe('<SaveBar/>', () => {
  beforeEach(() => {
    disabled = false;
  });
  it('should render correctly - active', () => {
    const { container } = exec();

    expect(container).toMatchSnapshot();
  });
  it('should render correctly - disabled', () => {
    disabled = true;

    const { container } = exec();

    expect(container).toMatchSnapshot();
  });
  it('should call onSave if the button was clicked', () => {
    const { getByText, getByPlaceholderText } = exec();

    fireEvent.change(getByPlaceholderText('Enter a name'), {
      target: { value: 'List' },
    });
    fireEvent.click(getByText('Save'));

    expect(onSave).toHaveBeenCalled();
  });
});
