import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const IconContainer = styled.div`
  background-color: ${variables.COLORS.white};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-top-left-radius: ${variables.BORDER_RADIUS_1};
  border-bottom-left-radius: ${variables.BORDER_RADIUS_1};
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0px 10px;
`;

export const Icon = styled.div`
  color: ${variables.COLORS.black_2};
  font-size: ${variables.FONT_SIZE_4};
`;

export const Input = styled.input`
  background-color: ${variables.COLORS.white};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-top-right-radius: ${variables.BORDER_RADIUS_1};
  border-bottom-right-radius: ${variables.BORDER_RADIUS_1};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 600;
  height: 100%;
  border: none;
  outline: none;
  &::placeholder {
    color: ${variables.COLORS.gray_2};
  }
`;

export const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-top: 10px;
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    font-size: ${variables.FONT_SIZE_4};
    margin-left: 20px;
    margin-top: 0px;
  }
`;