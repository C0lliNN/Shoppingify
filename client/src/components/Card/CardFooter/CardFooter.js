import PropTypes from 'prop-types';
import React from 'react';
import styles from './CardFooter.module.css';

export default function CardFooter(props) {
  return <div className={styles.CardFooter}>{props.children}</div>;
}

CardFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
