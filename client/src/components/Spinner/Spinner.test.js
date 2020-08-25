import Spinner from './Spinner';
import React from 'react';
import renderer from 'react-test-renderer';

test('A Spinner should have Spinner class', () => {
  const component = renderer.create(<Spinner />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
