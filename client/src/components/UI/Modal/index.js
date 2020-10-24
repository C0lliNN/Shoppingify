import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import {
  WrapperDiv,
  Backdrop,
  ModalDialog,
  FirstRowWrapper,
  Title,
  Icon,
  SecondRowRapper,
} from './styles';

function Modal({ title, onClose, cancelButton, okButton, children }) {
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
        {children}
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
  children: PropTypes.any,
};

export default Modal;
