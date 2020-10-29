import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const Title = styled.h3`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_3};
  color: ${variables.COLORS.black_1};
  margin-top: 0px;
  margin-bottom: 15px;
  font-weight: 600;
`;

export const Items = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  background-color: ${variables.COLORS.white};
  border-radius: ${variables.BORDER_RADIUS_1};
  font-size: ${variables.FONT_SIZE_2};
  font-weight: 600;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  margin-bottom: 15px;
  margin-right: 5px;
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    width: 120px;
    margin-right: 15px;
    margin-bottom: 30px;
    font-size: ${variables.FONT_SIZE_3};
  }
`;

export const Item = styled.span`
  cursor: pointer;
`;

export const Icon = styled.i`
  font-size: ${variables.FONT_SIZE_3};
  color: #c1c1c4;
  cursor: pointer;
`;

export const Quantity = styled.span`
  font-size: ${variables.FONT_SIZE_1};
  color: #f9a10a;
  white-space: nowrap;
  margin-left: 12px;
`;
