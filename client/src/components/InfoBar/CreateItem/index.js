import PropTypes from 'prop-types';
import React from 'react';
import ButtonBar from '../../ButtonBar';
import Button from '../../UI/Button/Button';
import FromGroup from '../../UI/FormGroup';
import CategoryFormGroup from '../../CategoryFormGroup';
import { useState } from 'react';
import { showListBuilder } from '../../../store/actions';
import { connect } from 'react-redux';
import Modal from '../../UI/Modal';
import getAxios from '../../../helpers/axios';
import Spinner from '../../UI/Spinner/Spinner';
import { addItem } from '../../../store/actions';
import { StyledCreateItem, Title } from './styles';

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
  if (!category.name) {
    return 'The category is required';
  }
  if (category.name.length < 4 || category.name.length > 120) {
    return 'The category must contain between 4 and 120 chars';
  }

  return null;
}

function CreateItem({ categories, showListBuilder, addItem }) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    let categoryPayload = categories.find(
      (categoryItem) => categoryItem.name === category
    );

    if (!categoryPayload) {
      categoryPayload = { name: category };
    }

    const payload = {
      name,
      note,
      image,
      category: categoryPayload,
    };

    const error = validateInput(payload);

    if (error) {
      setModalTitle(error);
      setShowModal(true);
    } else {
      try {
        const response = await getAxios().post('/items', payload);
        addItem(response.data);

        setIsLoading(false);
        showListBuilder();
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          setModalTitle(error.response.data.message);
        } else {
          setModalTitle(error.message);
        }
        setShowModal(true);
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
        {isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <FromGroup>
              <FromGroup.Label htmlFor="name">Name</FromGroup.Label>
              <FromGroup.Input
                placeholder="Enter a name"
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FromGroup>
            <FromGroup>
              <FromGroup.Label htmlFor="note">Note(optional)</FromGroup.Label>
              <FromGroup.Textarea
                placeholder="Enter a note"
                id="note"
                rows="3"
                name="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              ></FromGroup.Textarea>
            </FromGroup>
            <FromGroup>
              <FromGroup.Label htmlFor="image">Image(optional)</FromGroup.Label>
              <FromGroup.Input
                placeholder="Enter a url"
                name="image"
                id="image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </FromGroup>
            <CategoryFormGroup
              categories={categories}
              categoryValue={category}
              setCategoryValue={setCategory}
            />
          </React.Fragment>
        )}
        <ButtonBar>
          <Button btnType="flat" onClick={showListBuilder} type="button">
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
  addItem: PropTypes.func,
};

const mapDispatchToProps = {
  showListBuilder,
  addItem,
};

const mapStateToProps = (state) => {
  return {
    categories: state.itemsData.data.map((group) => group.category),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);
