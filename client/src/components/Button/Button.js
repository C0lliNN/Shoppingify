import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.module.css';

export default function Button(props) {
  const classes = [styles.Button];

  switch (props.type) {
    case 'primary':
      classes.push(styles.Primary);
      break;
    case 'success':
      classes.push(styles.Success);
      break;
    case 'danger':
      classes.push(styles.Danger);
      break;
    default:
      classes.push(styles.Primary);
  }

  return (
    <button onClick={props.onClick} className={classes.join(' ')}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'success', 'danger']),
};
