import CardBody from './CardBody';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../../Button/Button';
import styles from './CardBody.module.css';

describe('CardBody should output its children', () => {
  test('plain text', () => {
    render(<CardBody>Body</CardBody>);
    expect(screen.getByText('Body')).toBeTruthy();
  });
  test('HTML tags', () => {
    render(
      <CardBody>
        <p>Body</p>
      </CardBody>
    );
    expect(screen.getByText('Body').tagName).toBe('P');
  });
  test('React Components', () => {
    render(
      <CardBody>
        <Button>New</Button>
      </CardBody>
    );
    expect(screen.getByText('New')).toBeTruthy();
  });
});

test('CardBody should contains CardBody class', () => {
  render(<CardBody>Body</CardBody>);
  expect(screen.getByText('Body').classList).toContain(styles.CardBody);
});
