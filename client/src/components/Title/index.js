import React from 'react';
import * as variables from '../../helpers/style-constants';
import { H1 } from './styles';

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
