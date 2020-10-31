import PropTypes from 'prop-types';
import React from 'react';
import BackButton from '../../BackButton';
import * as variables from '../../../helpers/style-constants';
import {
  showListBuilder,
  removeItem,
  addItemToList,
} from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import ButtonBar from '../../ButtonBar';
import { useState } from 'react';
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
import { toast } from 'react-toastify';
import api from '../../../services/api';

function ItemDetails() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { item, isLoading: loading } = useSelector((state) => state.infoBar);

  const dispatch = useDispatch();

  async function handleDeleteItem() {
    setIsLoading(true);
    try {
      await api.delete(`/items/${item._id}`);

      setShowModal(false);
      setIsLoading(false);
      dispatch(removeItem(item));
      dispatch(showListBuilder());
      toast('✅ Item Deleted Successfully!');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
      setIsLoading(false);
      toast('❗️ Error while trying to delete the item!');
    }
  }

  function handleAddItemToList() {
    dispatch(addItemToList(item));
    dispatch(showListBuilder());
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

  let content = null;

  if (loading) {
    content = <Spinner />;
  } else if (item) {
    const imgHolder = {};

    if (item.image) {
      imgHolder.backgroundImage = `url('${item.image}')`;
      imgHolder.backgroundSize = 'cover';
      imgHolder.backgroundPosition = 'center';
    }

    imgHolder.backgroundColor = variables.COLORS.gray_2;

    content = (
      <>
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
          <Button
            btnType="raised"
            variant="primary"
            onClick={handleAddItemToList}
          >
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
      </>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => dispatch(showListBuilder())} />
      {content}
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
};

export default ItemDetails;
