import styled from 'styled-components';
import {
  COLORS,
  BORDER_RADIUS_1,
  BORDER_RADIUS_2,
  FONT_FAMILY,
  FONT_SIZE_2,
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
  font-size: ${FONT_SIZE_2};
  font-family: ${FONT_FAMILY};
  font-weight: bold;
  outline: none;
  padding: ${(props) => (props.btnType === 'raised' ? '20px' : '6px 15px')};
  cursor: pointer;
  &:disabled {
    background-color: ${(props) =>
      props.btnType === 'raised' ? COLORS.gray_2 : 'transparent'};
    border-color: ${COLORS.gray_2};
    color: ${(props) =>
      props.btnType === 'raised' ? COLORS.white : COLORS.gray_2};
    cursor: default;
  }
`;

Button.propTypes = {
  btnType: PropTypes.oneOf(['raised', 'flat']).isRequired,
  variant: PropTypes.oneOf(Object.keys(COLORS)).isRequired,
};

export default Button;
