import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const Container = styled.div`
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

export const ImageContainer = styled.div`
  border-radius: ${variables.BORDER_RADIUS_2};
  height: 0;
  width: 100%;
  margin: 30px auto;
  padding-bottom: 100%;
`;

export const Title = styled.h4`
  font-size: ${variables.FONT_SIZE_1};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 600;
  color: #c1c1c4;
  margin-top: 30px;
`;

export const Value = styled.h5`
  font-size: ${variables.FONT_SIZE_3};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 600;
  margin-top: 10px;
`;

export const InfoGroupWrapper = styled.div`
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    margin-bottom: 100px;
  }
`;