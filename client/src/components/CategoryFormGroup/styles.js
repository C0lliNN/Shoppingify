import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const ListView = styled.ul`
  border: 1px solid ${variables.COLORS.gray_1};
  box-sizing: border-box;
  padding: 12px;
  list-style: none;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-top-left-radius: ${variables.BORDER_RADIUS_1};
  border-bottom-left-radius: ${variables.BORDER_RADIUS_1};
  height: 145px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: ${variables.COLORS.white};
    border-top-right-radius: ${variables.BORDER_RADIUS_1};
    border-bottom-right-radius: ${variables.BORDER_RADIUS_1};
  }

  &::-webkit-scrollbar-thumb {
    background: ${variables.COLORS.gray_1};
    border-radius: ${variables.BORDER_RADIUS_1};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${variables.COLORS.gray_2};
  }

  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    margin-bottom: 100px;
  }
`;

export const ListItem = styled.li`
  font-size: ${variables.FONT_SIZE_3};
  line-height: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: ${variables.BORDER_RADIUS_1};
  font-weight: 500;
  font-family: ${variables.FONT_FAMILY};
  color: ${variables.COLORS.gray_3};
  cursor: pointer;
  &:hover,
  &:active {
    background-color: #f2f2f2;
    color: ${variables.COLORS.black_1};
  }
`;