import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const Container = styled.section`
  padding: 20px 40px;
`;

export const Title = styled.h3`
  font-size: ${variables.FONT_SIZE_4};
  font-weight: 700;

  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    font-size: 32px;
  }
`;

export const ListsContainer = styled.ul`
  margin: 0;
  margin-top: 40px;
`;

export const NoItems = styled.p`
  font-size: ${variables.FONT_SIZE_3};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 600;
  margin-top: 50px;
`;

export const List = styled.li`
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin: 12px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h3 {
    font-size: ${variables.FONT_SIZE_2};
    font-weight: 700;
  }

  & .date {
    color: #c1c1c4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: ${variables.FONT_SIZE_1};
    & .icon {
      margin-right: 10px;
    }
  }

  & .right {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    & span {
      color: #f9a109;
      font-size: ${variables.FONT_SIZE_3};
    }
  }
`;

export const Badge = styled.span`
  border: 1px solid ${(props) => (props.canceled ? '#EB5757' : '#56CCF2')};
  border-radius: 6px;
  color: ${(props) => (props.canceled ? '#EB5757' : '#56CCF2')};
  padding: 3px 5px;
  margin: auto 15px;
`;
