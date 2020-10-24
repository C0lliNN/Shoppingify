import styled from 'styled-components';
import * as variables from '../../../../../helpers/style-constants';

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px auto;
`;

export const ItemNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ItemName = styled.h5`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_2};
  font-weight: 600;
  color: ${variables.COLORS.black_1};
  @media(min-width: ${variables.LG_BREAK_POINT}px) {
    font-size: ${variables.FONT_SIZE_3};
  }
`;

export const EditContainer = styled.div`
  width: 175px;
  background-color: #fff;
  border-radius: ${variables.BORDER_RADIUS_1};
  display: flex;
  align-items: center;
  justify-content: space-around;
  & .icon {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    & span {
      font-size: 20px;
      color: #F9A109;
    }
  }
  & .delete {
    background-color: #F9A109;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: ${variables.BORDER_RADIUS_1}
    & span {
      font-size: 20px;
      color: #fff;
    }
  }
`;