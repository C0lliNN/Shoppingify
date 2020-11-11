import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const StyledCreateItem = styled.div`
  padding: 20px 15px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    height: 100%;
  }
`;

export const Title = styled.h3`
  font-size: ${variables.FONT_SIZE_4};
  font-weight: 600;
  margin-bottom: 30px;
`;

export const ValidationError = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${variables.COLORS.danger};
  align-self: start;
  display: block;
  margin-top: 8px;
`;
