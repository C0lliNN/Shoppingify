import PropTypes from 'prop-types';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../Button/Button';
import {
  COLORS,
  BORDER_RADIUS_2,
  FONT_FAMILY,
  FONT_SIZE_4,
} from '../../../helpers/style-constants';

const WrapperDiv = styled.div`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 150;
`;

const Backdrop = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 50;
`;

const translate = keyframes`
  from {
    transform: translateY(-200%)
  }
  to {
    transform: translateY(0)
  }
`;

const ModalDialog = styled.div`
  position: relative;
  width: 80%;
  max-width: 550px;
  padding: 20px;
  box-sizing: border-box;
  margin: auto;
  background-color: ${COLORS.white};
  border-radius: ${BORDER_RADIUS_2};
  z-index: 100;
  animation: ${translate} 0.5s;
`;

const Title = styled.h3`
  font-family: ${FONT_FAMILY};
  font-weight: 500;
  font-size: ${FONT_SIZE_4};
`;

const Icon = styled.i`
  font-size: ${FONT_SIZE_4};
  color: ${COLORS.gray_3};
`;

const FirstRowWrapper = styled.div`
  display: flex;
  align-items: top;
  justify-content: space-between;
`;

const SecondRowRapper = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function Modal({ title, onClose, cancelButton, okButton }) {
  return (
    <WrapperDiv>
      <Backdrop />
      <ModalDialog>
        <FirstRowWrapper>
          <Title>{title}</Title>
          <Button btnType="flat" onClick={onClose} title="close">
            <Icon className="material-icons">clear</Icon>
          </Button>
        </FirstRowWrapper>
        <SecondRowRapper>
          {cancelButton}
          {okButton}
        </SecondRowRapper>
      </ModalDialog>
    </WrapperDiv>
  );
}

Modal.propTypes = {
  cancelButton: PropTypes.node,
  okButton: PropTypes.node,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default Modal;
