import styled from 'styled-components';
import * as variables from '../../../../helpers/style-constants';

export const Wrapper = styled.div`
  margin-top: 40px;
`;

export const Category = styled.h5`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_2};
  font-weight: 600;
  color: ${variables.COLORS.gray_3};
  margin-bottom: 20px;
`;

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
  font-size: ${variables.FONT_SIZE_3};
  font-weight: 600;
  color: ${variables.COLORS.black_1};
`;