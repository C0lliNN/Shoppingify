import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
`;

export const Card = styled.div`
  background-color: ${variables.COLORS.light_brown};
  border-radius: ${variables.BORDER_RADIUS_2};
  padding: 30px 20px;
  width: 70%;
  margin: auto;
  max-width: 700px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px #0000001c;
`;

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h3`
  font-weight: 600;
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_4};
  color: #3f3d56;
`;
