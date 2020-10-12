import styled, { keyframes } from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const WrapperDiv = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 150;
`;

export const Backdrop = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 50;
`;

export const translate = keyframes`
  from {
    transform: translateY(-200%)
  }
  to {
    transform: translateY(0)
  }
`;

export const ModalDialog = styled.div`
  position: relative;
  width: 80%;
  max-width: 550px;
  padding: 20px;
  box-sizing: border-box;
  margin: auto;
  background-color: ${variables.COLORS.white};
  border-radius: ${variables.BORDER_RADIUS_2};
  z-index: 100;
  animation: ${translate} 0.5s;
`;

export const Title = styled.h3`
  font-family: ${variables.FONT_FAMILY};
  font-weight: 500;
  font-size: ${variables.FONT_SIZE_4};
`;

export const Icon = styled.i`
  font-size: ${variables.FONT_SIZE_4};
  color: ${variables.COLORS.gray_3};
`;

export const FirstRowWrapper = styled.div`
  display: flex;
  align-items: top;
  justify-content: space-between;
`;

export const SecondRowRapper = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
