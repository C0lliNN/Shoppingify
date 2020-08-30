import styled from 'styled-components';
import {
  COLORS,
  BORDER_RADIUS_1,
  BORDER_RADIUS_2,
  FONT_FAMILY,
} from '../../../Variables';
import PropTypes from 'prop-types';

const Button = styled.button`
  background-color: ${(props) =>
    props.btnType === 'raised' ? COLORS[props.variant] : 'transparent'};
  border-radius: ${(props) =>
    props.btnType === 'raised' ? BORDER_RADIUS_1 : BORDER_RADIUS_2};
  color: ${(props) =>
    props.btnType === 'raised' ? COLORS.white : COLORS[props.variant]};
  border: 2px solid ${(props) => COLORS[props.variant]};
  font-family: ${FONT_FAMILY};
  font-weight: bold;
  outline: none;
  padding: ${(props) =>
    props.btnType === 'raised' ? '12px 15px' : '6px 15px'};
  cursor: pointer;
`;

Button.propTypes = {
  btnType: PropTypes.oneOf(['raised', 'flat']).isRequired,
  variant: PropTypes.oneOf(Object.keys(COLORS)).isRequired,
};

export default Button;
