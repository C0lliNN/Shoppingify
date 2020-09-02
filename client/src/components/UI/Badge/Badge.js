import styled from 'styled-components';
import {
  COLORS,
  BORDER_RADIUS_1,
  FONT_SIZE_1,
} from '../../../helpers/style-constants';
import PropTypes from 'prop-types';

const Badge = styled.span`
  border: 1px solid ${(props) => COLORS[props.variant]};
  border-radius: ${BORDER_RADIUS_1};
  color: ${(props) => COLORS[props.variant]};
  padding: 3px 10px;
  font-weight: 500;
  font-size: ${FONT_SIZE_1};
`;

Badge.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  variant: PropTypes.oneOf(Object.keys(COLORS)).isRequired,
};

export default Badge;
