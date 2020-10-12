import PropTypes from 'prop-types';
import React from 'react';
import BackButton from '../../BackButton';
import * as variables from '../../../helpers/style-constants';
import { showListBuilder, removeItem } from '../../../store/actions';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';
import ButtonBar from '../../ButtonBar';
import { useState } from 'react';
import getAxios from '../../../helpers/axios';
import Modal from '../../UI/Modal';
import Spinner from '../../UI/Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage';
import {
  Container,
  ImageContainer,
  Title,
  Value,
  InfoGroupWrapper,
} from './styles';

function ItemDetails({ item, showListBuilder, removeItem }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  async function handleDeleteItem() {
    const axios = getAxios();
    setIsLoading(true);
    try {
      await axios.delete(`/items/${item._id}`);

      setShowModal(false);
      setIsLoading(false);
      removeItem(item);
      showListBuilder();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
      setIsLoading(false);
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  let modalContent = null;

  if (isLoading) {
    modalContent = <Spinner />;
  } else if (error) {
    modalContent = <ErrorMessage message={error} />;
  }

  const imgHolder = {};

  if (item.image) {
    imgHolder.backgroundImage = `url('${item.image}')`;
    imgHolder.backgroundSize = 'cover';
    imgHolder.backgroundPosition = 'center';
  }

  imgHolder.backgroundColor = variables.COLORS.gray_2;

  return (
    <Container>
      <BackButton onClick={showListBuilder} />
      <ImageContainer style={imgHolder} title={item.name} />
      <Title>name</Title>
      <Value style={{ fontSize: variables.FONT_SIZE_4 }}>{item.name}</Value>
      <Title>category</Title>
      <Value>{item.category.name}</Value>
      <InfoGroupWrapper>
        <Title>note</Title>
        <Value>{item.note ? item.note : 'No Notes'}</Value>
      </InfoGroupWrapper>
      <ButtonBar>
        <Button btnType="flat" onClick={() => setShowModal(true)}>
          delete
        </Button>
        <Button btnType="raised" variant="primary">
          Add to list
        </Button>
      </ButtonBar>
      {showModal && (
        <Modal
          title="Do you really want to remove this item?"
          onClose={closeModal}
          okButton={
            <Button
              btnType="raised"
              variant="danger"
              onClick={handleDeleteItem}
            >
              Yes
            </Button>
          }
          cancelButton={
            <Button btnType="flat" onClick={closeModal}>
              Cancel
            </Button>
          }
        >
          {modalContent}
        </Modal>
      )}
    </Container>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    note: PropTypes.string,
  }),
  showListBuilder: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  showListBuilder,
  removeItem,
};

export default connect(null, mapDispatchToProps)(ItemDetails);
