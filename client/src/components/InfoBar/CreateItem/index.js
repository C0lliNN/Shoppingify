import React from 'react';
import ButtonBar from '../../ButtonBar';
import Button from '../../UI/Button';
import FormGroup from '../../UI/FormGroup';
import CategoryFormGroup from '../../CategoryFormGroup';
import { useState } from 'react';
import { showListBuilder } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../UI/Modal';
import getAxios from '../../../helpers/axios';
import Spinner from '../../UI/Spinner/Spinner';
import { addItem } from '../../../store/actions';
import { StyledCreateItem, Title, ValidationError } from './styles';
import { useForm } from 'react-hook-form';

function CreateItem() {
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);

  const dispatch = useDispatch();
  const categories = useSelector((state) =>
    state.itemsData.data.map((group) => group.category)
  );
  const { register, handleSubmit, errors } = useForm();

  const nameRef = register({
    required: { value: true, message: 'The name is required' },
    minLength: {
      value: 2,
      message: 'The name must contain between 2 and 40 chars',
    },
    maxLength: {
      value: 40,
      message: 'The name must contain between 2 and 40 chars',
    },
  });

  const noteRef = register({
    maxLength: {
      value: 255,
      message: 'The note must contain at most 255 chars',
    },
  });

  const imageRef = register({
    pattern: {
      value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
      message: 'The image must be a valid url',
    },
  });

  const categoryRef = register({
    required: { value: true, message: 'The category is required' },
    minLength: {
      value: 4,
      message: 'The category must contain between 4 and 120 chars',
    },
    maxLength: {
      value: 120,
      message: 'The category must contain between 4 and 120 chars',
    },
  });

  async function onSubmit(data, event) {
    event.preventDefault();

    const { name, note, category, image } = data;

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

    try {
      const response = await getAxios().post('/items', payload);
      dispatch(addItem(response.data));

      dispatch(showListBuilder());
    } catch (error) {
      if (error.response) {
        setModalTitle(error.response.data.message);
      } else {
        setModalTitle(error.message);
      }
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  console.log(errors);

  return (
    <StyledCreateItem>
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="post">
        <Title>Add a new item</Title>
        {isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <FormGroup>
              <FormGroup.Label htmlFor="name">Name</FormGroup.Label>
              <FormGroup.Input
                placeholder="Enter a name"
                ref={nameRef}
                id="name"
                name="name"
              />
              {errors?.name && (
                <ValidationError>{errors?.name.message}</ValidationError>
              )}
            </FormGroup>

            <FormGroup>
              <FormGroup.Label htmlFor="note">Note(optional)</FormGroup.Label>
              <FormGroup.Textarea
                placeholder="Enter a note"
                id="note"
                rows="3"
                name="note"
                ref={noteRef}
              ></FormGroup.Textarea>
              {errors?.note && (
                <ValidationError>{errors?.note.message}</ValidationError>
              )}
            </FormGroup>
            <FormGroup>
              <FormGroup.Label htmlFor="image">Image(optional)</FormGroup.Label>
              <FormGroup.Input
                placeholder="Enter a url"
                name="image"
                id="image"
                ref={imageRef}
              />
              {errors?.image && (
                <ValidationError>{errors?.image.message}</ValidationError>
              )}
            </FormGroup>
            <CategoryFormGroup
              categories={categories}
              ref={categoryRef}
              errors={errors}
            />
          </React.Fragment>
        )}
        <ButtonBar>
          <Button
            btnType="flat"
            onClick={() => dispatch(showListBuilder())}
            type="button"
          >
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

export default CreateItem;
