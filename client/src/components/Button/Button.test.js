import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';
import styles from './Button.module.css';

describe('A Button with the text', () => {
  test('Save should output Save', () => {
    render(<Button>Save</Button>);
    expect(screen.getByText(/Save/i)).toBeTruthy();
  });
  test('Delete should output Delete', () => {
    render(<Button>Delete</Button>);
    expect(screen.getByText(/Delete/i)).toBeTruthy();
  });
});

describe('A Button with the type', () => {
  test('primary should contains the Button and Primary classes', () => {
    render(<Button type="primary">Button</Button>);
    const classes = screen.getByText(/Button/).classList;

    expect(classes.length).toBe(2);
    expect(classes).toContain(styles.Button);
    expect(classes).toContain(styles.Primary);
  });
  test('success should contains the Button and Success classes', () => {
    render(<Button type="success">Button</Button>);
    const classes = screen.getByText(/Button/).classList;

    expect(classes.length).toBe(2);
    expect(classes).toContain(styles.Button);
    expect(classes).toContain(styles.Success);
  });
  test('danger should contains the Button and Danger classes', () => {
    render(<Button type="danger">Button</Button>);
    const classes = screen.getByText(/Button/).classList;

    expect(classes.length).toBe(2);
    expect(classes).toContain(styles.Button);
    expect(classes).toContain(styles.Danger);
  });
  test('undefined should contains the Button and Primary classes', () => {
    render(<Button type="primary">Button</Button>);
    const classes = screen.getByText(/Button/).classList;

    expect(classes.length).toBe(2);
    expect(classes).toContain(styles.Button);
    expect(classes).toContain(styles.Primary);
  });
});

test('The Button onclick function should work', () => {
  const handler = jest.fn(() => {});

  render(<Button onClick={handler}>Close</Button>);
  fireEvent.click(screen.getByText('Close'));

  expect(handler).toBeCalled();
});
