import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const StyledErrorMessage = styled.div`
  padding: 15px;
`;

export const Title = styled.h4`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_3};
  font-weight: 600;
  color: ${variables.COLORS.danger};
  margin-bottom: 8px;
`;

export const Message = styled.p`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_2};
  font-weight: 600;
  color: ${variables.COLORS.danger};
`;