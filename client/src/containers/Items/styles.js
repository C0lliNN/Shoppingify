import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const StyledItems = styled.div`
  padding: 20px;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #fafafe;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    padding: 20px 60px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: top;
  justify-content: start;
  flex-wrap: wrap;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    flex-wrap: nowrap;
    justify-content: space-around;
  }
`;

export const Text = styled.p`
  font-size: ${variables.FONT_SIZE_3};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 600;
  margin-top: 50px;
`;