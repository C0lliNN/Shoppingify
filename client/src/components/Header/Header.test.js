import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import styles from './Header.module.css';
import { BrowserRouter } from 'react-router-dom';

test('Header should contains a link', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByText('Todos App').tagName).toBe('A');
});

test('Header should contains Header class', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(
    screen.getByText('Todos App').parentElement.parentElement.classList
  ).toContain(styles.Header);
});

test('Header should the link contains Link class', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByText('Todos App').classList).toContain(styles.Link);
});

test('Header should contains a h1', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(screen.getByText('Todos App').parentElement.tagName).toBe('H1');
});
