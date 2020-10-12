import * as variables from '../../../../helpers/style-constants';
import FormGroup from '../../../UI/FormGroup';
import styled from 'styled-components';

export const StyledSaveBar = styled.form`
  display: flex;
  align-items: center;
  margin: 0px 30px;
  border: 2px solid ${variables.COLORS.primary};
  border-radius: ${variables.BORDER_RADIUS_1};
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  ${({ disabled }) =>
    disabled ? `border-color: ${variables.COLORS.gray_2};` : ''}
`;

export const ModifiedInput = styled(FormGroup.Input)`
  border: none;
  flex-grow: 2;
  order: 0;
`;