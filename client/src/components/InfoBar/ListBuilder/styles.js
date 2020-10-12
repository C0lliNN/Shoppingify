import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';

export const StyledListBuilder = styled.div`
  background-color: ${variables.COLORS.light_brown};
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    padding-bottom: 120px;
  }
`;

export const IllustrationContainer = styled.div`
  background-color: ${variables.COLORS.burgundy};
  width: 100%;
  height: 110px;
  padding: 15px 0px;
  border-radius: ${variables.BORDER_RADIUS_2};
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
`;

export const Title = styled.h3`
  font-size: ${variables.FONT_SIZE_2};
  color: ${variables.COLORS.white};
  font-weight: 600;
`;

export const BottleIllustration = styled.img`
  width: 70px;
  margin-top: -35px;
`;

export const CustomButton = styled.button`
  background-color: ${variables.COLORS.white};
  border-radius: ${variables.BORDER_RADIUS_1};
  padding: 8px 25px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  outline: none;
  font-family: ${variables.FONT_FAMILY};
  margin-top: 10px;
`;

export const ListNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  justify-content: space-between;
`;

export const ListName = styled.h3`
  font-size: ${variables.FONT_SIZE_4};
  font-weight: 600;
`;

export const EditIcon = styled.i`
  font-size: ${variables.FONT_SIZE_4};
  color: ${variables.COLORS.black_2};
`;

export const Header = styled.div`
  width: 100%;
`;

export const Text = styled.p`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_3};
  font-weight: 600;
`;

export const CartIllustrationContainer = styled.div`
  text-align: center;
  width: 100%;
`;

export const CartIllustration = styled.img`
  width: 80%;
  max-width: 245px;
  margin: auto;
`;