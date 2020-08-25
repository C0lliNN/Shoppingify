import PropTypes from 'prop-types';
import React from 'react';
import styles from './CardBody.module.css';

export default function CardBody(props) {
  return <div className={styles.CardBody}>{props.children}</div>;
}

CardBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
