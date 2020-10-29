import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const Container = styled.section`
  padding: 30px 40px;
`;

export const TopContainer = styled.div`
  width: 100%;
  display: block;
  & > div {
    margin-bottom: 40px;
  }
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    display: flex;
    align-items: top;
    justify-content: space-between;
    & > div {
      width: 45%;
      margin-bottom: 0;
    }
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 38px;

  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    font-size: ${variables.FONT_SIZE_4};
  }
`;

export const ItemGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
  & .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    margin-bottom: 10px;
  }
  & .bar {
    position: relative;
    height: 6px;
    border-radius: 4px;

    & .background {
      height: 100%;
      width: 100%;
      background: #e0e0e0;
      position: absolute;
      border-radius: 4px;
    }

    & .indicator {
      position: absolute;
      height: 100%;
      border-radius: 4px;
      z-index: 10;
    }

    & .orange-bar {
      background: #f9a109;
    }

    & .blue-bar {
      background: #56ccf2;
    }
  }
`;
