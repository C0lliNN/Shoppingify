import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';

export const Form = styled.form`
  margin-top: 50px;
`;

export const ButtonBar = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export const Error = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${variables.COLORS.danger};
  align-self: start;
  display: block;
  margin-top: 8px;
`;
