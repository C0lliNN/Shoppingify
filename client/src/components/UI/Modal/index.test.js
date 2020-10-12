import React from 'react';
import Button from '../Button/Button';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '.';
import 'jest-styled-components';

let errorMessage;
let title;
let onClose;
let cancelButton;
let okButton;

function exec() {
  return render(
    <Modal
      title={title}
      onClose={onClose}
      cancelButton={cancelButton}
      okButton={okButton}
    />
  );
}

beforeEach(() => {
  console.error = jest.fn((message) => (errorMessage = message));
  title = 'Title';
  onClose = jest.fn();
  cancelButton = <button>Cancel</button>;
  okButton = (
    <Button type="raised" variant="primary">
      OK
    </Button>
  );
});

describe('<Modal/>', () => {
  it('should console.error if title is undefined', () => {
    title = undefined;

    exec();

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*title.*/i);
  });
  it('should console.error if the is not a string', () => {
    title = true;

    exec();

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*invalid.*title.*/i);
  });
  it('should console.error if onClose is not a function', () => {
    onClose = 'closing';

    exec();

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*function.*/i);
  });
  it('should console.error if cancelButton is not a node', () => {
    cancelButton = true;

    exec();

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*invalid.*cancelButton.*/i);
  });
  it('should console.error if okButton is not a node', () => {
    okButton = true;

    exec();

    expect(console.error).toHaveBeenCalled();
    expect(errorMessage).toMatch(/.*invalid.*okButton.*/i);
  });
  it('should render correctly', () => {
    const { container } = exec();

    expect(console.error).not.toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
  it('should execute the onClose method when the close icon is clicked', () => {
    exec();

    const closeButton = screen.queryByTitle('close');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
