import PropTypes from 'prop-types';
import React from 'react';
import styles from './CardHeader.module.css';

export default function CardHeader(props) {
  return <div className={styles.CardHeader}>{props.children}</div>;
}

CardHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
