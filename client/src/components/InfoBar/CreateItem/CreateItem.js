import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as variables from '../../../helpers/style-constants';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../UI/Button/Button';
import FromGroup from '../../UI/FormGroup/FormGroup';
import CategoryFormGroup from '../../CategoryFormGroup/CategoryFormGroup';
import { useState } from 'react';
import { showListBuilder } from '../../../store/actions';
import { connect } from 'react-redux';
import Modal from '../../UI/Modal/Modal';
import getAxios from '../../../helpers/axios';

const StyledCreateItem = styled.div`
  padding: 20px 15px;
`;

const Title = styled.h3`
  font-size: ${variables.FONT_SIZE_4};
  font-weight: 600;
  margin-bottom: 30px;
`;

function validateInput(data) {
  const { name, note, image, category } = data;
  if (!name) {
    return 'The name is required';
  }
  if (name.length < 2 || name.length > 40) {
    return 'The name must contain between 2 and 40 chars';
  }
  if (note && note.length > 255) {
    return 'The note must contain at most 255 chars';
  }
  //prettier-ignore
  //eslint-disable-next-line
  if (image && !image.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i)){
    return "The image must be a valid url"
  }
  if (!category) {
    return 'The category is required';
  }
  if (category.length < 4 || category.length > 120) {
    return 'The category must contain between 4 and 120 chars';
  }

  return null;
}

function CreateItem({ categories, showListBuilder }) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = { name, note, image, category };

    const error = validateInput(payload);

    if (error) {
      setModalTitle(error);
      setShowModal(true);
    } else {
      try {
        const response = await getAxios().post('/itens', payload);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <StyledCreateItem>
      <form onSubmit={handleSubmit} action="#" method="post">
        <Title>Add a new item</Title>
        <FromGroup>
          <FromGroup.Label>Name</FromGroup.Label>
          <FromGroup.Input
            placeholder="Enter a name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FromGroup>
        <FromGroup>
          <FromGroup.Label>Note(optional)</FromGroup.Label>
          <FromGroup.Textarea
            placeholder="Enter a note"
            rows="3"
            name="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          ></FromGroup.Textarea>
        </FromGroup>
        <FromGroup>
          <FromGroup.Label>Image(optional)</FromGroup.Label>
          <FromGroup.Input
            placeholder="Enter a url"
            name="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </FromGroup>
        <CategoryFormGroup
          categories={categories}
          categoryValue={category}
          setCategoryValue={setCategory}
        />
        <ButtonBar>
          <Button btnType="flat" onClick={showListBuilder}>
            cancel
          </Button>
          <Button btnType="raised" variant="primary" type="submit">
            Save
          </Button>
        </ButtonBar>
      </form>
      {showModal && (
        <Modal
          title={modalTitle}
          onClose={closeModal}
          okButton={
            <Button btnType="raised" variant="danger" onClick={closeModal}>
              OK
            </Button>
          }
        />
      )}
    </StyledCreateItem>
  );
}

CreateItem.propTypes = {
  categories: PropTypes.array,
  showListBuilder: PropTypes.func,
};

const mapDispatchToProps = {
  showListBuilder,
};

const mapStateToProps = (state) => {
  return {
    categories: state.activeList.itemsGroup.map((group) => group.category),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);
