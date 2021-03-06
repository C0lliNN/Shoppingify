import styled from 'styled-components';
import {
  COLORS,
  BORDER_RADIUS_1,
  BORDER_RADIUS_2,
  FONT_FAMILY,
  FONT_SIZE_2,
  BUTTON_TYPES,
  LG_BREAK_POINT,
} from '../../../helpers/style-constants';
import PropTypes from 'prop-types';

const Button = styled.button`
  ${(props) => {
    switch (props.btnType) {
      case 'raised': {
        return `
          background-color: ${COLORS[props.variant]}; 
          border-color: ${COLORS[props.variant]};
          border-radius: ${BORDER_RADIUS_1}; 
          color: ${COLORS.white}; 
          padding: 20px;
        `;
      }
      case 'outlined': {
        return `
          background-color: transparent;
          border-radius: ${BORDER_RADIUS_2}; 
          border-color: ${COLORS[props.variant]};
          color: ${COLORS[props.variant]};
          padding: 4px 10px;
        `;
      }
      case 'flat': {
        return `
          background-color: transparent;
          border-radius: ${BORDER_RADIUS_1}; 
          color: ${COLORS.black_2};
          border-color: transparent;
          padding: 20px;
        `;
      }
      default:
        return `
          background-color: ${COLORS[props.variant]}; 
          border-color: ${COLORS[props.variant]};
          border-radius: ${BORDER_RADIUS_1}; 
          color: ${COLORS.white}; 
          padding: 20px;
        `;
    }
  }}
  border-width: 2px;
  border-style: solid;
  font-size: ${FONT_SIZE_2};
  font-family: ${FONT_FAMILY};
  font-weight: bold;
  outline: none;
  cursor: pointer;
  &:disabled {
    ${(props) => {
      switch (props.btnType) {
        case 'raised': {
          return `
            background-color: ${COLORS.gray_2};
            border-color: ${COLORS.gray_2}; 
          `;
        }
        case 'outlined': {
          return ``;
        }
        case 'flat': {
          return `
            color: ${COLORS.gray_2}
          `;
        }
        default:
          return `
            border-color: ${COLORS.gray_2};       
            background-color: ${COLORS.gray_2};
        `;
      }
    }}
    cursor: default;
  }

  @media(min-width: ${LG_BREAK_POINT}px) {
    ${(props) => {
      if (props.btnType === 'outlined') {
        return 'padding: 6px 15px;'
      }
    }}
  }
`;

Button.propTypes = {
  btnType: PropTypes.oneOf(BUTTON_TYPES).isRequired,
  variant: PropTypes.oneOf(Object.keys(COLORS)),
};

export default Button;
