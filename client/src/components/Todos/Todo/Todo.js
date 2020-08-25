import PropTypes from 'prop-types';
import React from 'react';
import styles from './Todo.module.css';
import Button from '../../Button/Button';
import tingle from 'tingle.js';

export default function Todo({ todo }) {
  function handleShowDetails() {
    const modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      closeMethods: ['overlay', 'button', 'escape'],
    });

    modal.setContent(`<h1>${todo.title}</h1><p>${todo.description}</p>`);
    modal.addFooterBtn(
      'Close',
      'tingle-btn tingle-btn--pull-right tingle-btn--danger',
      () => modal.close()
    );
    modal.open();
  }
  return (
    <li className={styles.Todo}>
      <div>{todo.title}</div>
      <div>
        <Button type="primary" onClick={handleShowDetails}>
          Details
        </Button>
      </div>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
