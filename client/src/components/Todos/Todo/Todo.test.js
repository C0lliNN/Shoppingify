import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Todo from './Todo';

describe('A todo should output a title and a Button', () => {
  test('Clean Bedroom should output Clean Bedroom', () => {
    render(
      <Todo
        todo={{
          _id: '1',
          title: 'Clean Bedroom',
          description: 'Clean my Bedroom',
        }}
      />
    );
    expect(screen.getByText('Clean Bedroom')).toBeTruthy();
    expect(screen.getByText('Details').tagName).toBe('BUTTON');
  });
  test('Finish Node Course should output Finish Node Course', () => {
    render(
      <Todo
        todo={{
          _id: '1',
          title: 'Finish Node Course',
          description: 'From Max',
        }}
      />
    );
    expect(screen.getByText('Finish Node Course')).toBeTruthy();
    expect(screen.getByText('Details').tagName).toBe('BUTTON');
  });
});

describe('Details Button should show Modal', () => {
  beforeEach(() => {
    render(
      <Todo
        todo={{
          _id: '1',
          title: 'Clean Bedroom',
          description: 'Clean my Bedroom',
        }}
      />
    );
    fireEvent.click(screen.getByText('Details'));
  });
  test('The description should be visible', () => {
    expect(screen.getByText('Clean my Bedroom')).toBeTruthy();
  });
  test('The close button should be visible', () => {
    console.log();
    expect(screen.getAllByText('Close')[3].tagName).toBe('BUTTON');
  });
});
