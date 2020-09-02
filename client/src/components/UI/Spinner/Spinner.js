import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../../helpers/style-constants';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border-radius: 50%;
  width: 10em;
  height: 10em;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(249, 161, 9, 0.2);
  border-right: 1.1em solid rgba(249, 161, 9, 0.2);
  border-bottom: 1.1em solid rgba(249, 161, 9, 0.2);
  border-left: 1.1em solid ${COLORS.primary};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${rotate} 1.1s infinite linear;
  animation: ${rotate} 1.1s infinite linear;
  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`;

export default Spinner;
