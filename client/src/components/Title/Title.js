import React from 'react';
import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

const H1 = styled.h1`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_3};
  font-weight: 600;
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    font-size: ${variables.FONT_SIZE_4};
  }
`;

function Title() {
  return (
    <H1>
      <span style={{ color: variables.COLORS.primary, fontWeight: 'bold' }}>
        Shoppingify{' '}
      </span>
      allows you take your shopping list wherever you go
    </H1>
  );
}

export default Title;
