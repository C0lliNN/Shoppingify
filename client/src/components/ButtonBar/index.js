import PropTypes from 'prop-types';
import React from 'react';
import { ButtonBarWrapper } from './styles';

export default function ButtonBar(props) {
  return <ButtonBarWrapper {...props}>{props.children}</ButtonBarWrapper>;
}

ButtonBar.propTypes = {
  children: PropTypes.any,
};
