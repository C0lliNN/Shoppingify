import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/index';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function render(ui, { ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  Wrapper.propTypes = {
    children: PropTypes.any,
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function getByTextWithMarkup(getByText, text) {
  return getByText((content, node) => {
    const hasText = (node) => node.textContent === text;

    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );

    return nodeHasText && childrenDontHaveText;
  });
}

export { render, getByTextWithMarkup };
