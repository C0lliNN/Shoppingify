import PropTypes from 'prop-types';
import React from 'react';
import styles from './Card.module.css';
import CardHeader from './CardHeader/CardHeader';
import CardBody from './CardBody/CardBody';
import CardFooter from './CardFooter/CardFooter';
function Card(props) {
  return <div className={styles.Card}>{props.children}</div>;
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
