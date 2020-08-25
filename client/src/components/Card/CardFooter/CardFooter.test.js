import CardFooter from './CardFooter';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../../Button/Button';
import styles from './CardFooter.module.css';

describe('CardFooter should output its children', () => {
  test('plain text', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toBeTruthy();
  });
  test('HTML tags', () => {
    render(
      <CardFooter>
        <p>Footer</p>
      </CardFooter>
    );
    expect(screen.getByText('Footer').tagName).toBe('P');
  });
  test('React Components', () => {
    render(
      <CardFooter>
        <Button>New</Button>
      </CardFooter>
    );
    expect(screen.getByText('New')).toBeTruthy();
  });
});

test('CardFooter should contains CardFooter class', () => {
  render(<CardFooter>Footer</CardFooter>);
  expect(screen.getByText('Footer').classList).toContain(styles.CardFooter);
});
