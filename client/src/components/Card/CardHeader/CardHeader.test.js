import CardHeader from './CardHeader';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../../Button/Button';
import styles from './CardHeader.module.css';

describe('CardHeader should output its children', () => {
  test('plain text', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toBeTruthy();
  });
  test('HTML tags', () => {
    render(
      <CardHeader>
        <p>Header</p>
      </CardHeader>
    );
    expect(screen.getByText('Header').tagName).toBe('P');
  });
  test('React Components', () => {
    render(
      <CardHeader>
        <Button>New</Button>
      </CardHeader>
    );
    expect(screen.getByText('New')).toBeTruthy();
  });
});

test('CardHeader should contains CardHeader class', () => {
  render(<CardHeader>Header</CardHeader>);
  expect(screen.getByText('Header').classList).toContain(styles.CardHeader);
});
