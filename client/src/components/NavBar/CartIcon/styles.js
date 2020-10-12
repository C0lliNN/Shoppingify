import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const CartIconWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.div.attrs((props) => ({
  'data-tip': props['data-tip'],
  'data-for': props['data-for'],
  'data-testid': props['data-testid'],
}))`
  width: 42px;
  height: 42px;
  border-radius: 100%;
  background-color: ${variables.COLORS.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled.div`
  padding: 2px 5px;
  font-size: ${variables.FONT_SIZE_2};
  border-radius: 4px;
  background-color: ${variables.COLORS.danger};
  color: white;
  position: absolute;
  top: 0;
  right: 0;
`;

export const Icon = styled.i`
  color: ${variables.COLORS.white};
  font-size: 20px;
`;