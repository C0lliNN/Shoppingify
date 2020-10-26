import React, { useEffect } from 'react';
import ButtonBar from '../../ButtonBar';
import Button from '../../UI/Button';
import bottle from '../../../assets/images/bottle.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActiveListHandler,
  saveListHandler,
  showCreateItem,
} from '../../../store/actions';
import { useState } from 'react';
import cartIllustration from '../../../assets/images/shopping.svg';
import SaveBar from './SaveBar/index.js';
import ItemsGroup from './ItemsGroup';
import {
  StyledListBuilder,
  Header,
  IllustrationContainer,
  BottleIllustration,
  Title,
  CustomButton,
  ListNameContainer,
  ListName,
  EditIcon,
  Text,
  CartIllustrationContainer,
  CartIllustration,
} from './styles';
import { completeListHandler } from '../../../store/actions';

function ListBuilder() {
  const [name, setName] = useState('');

  const list = useSelector((state) => state.activeList);
  const dispatch = useDispatch();

  const hasItems =
    list && list.data.filter((p) => p.category && p.category._id).length;

  function handleOnSave() {
    dispatch(saveListHandler(name));
  }

  function handleComplete() {
    dispatch(completeListHandler());
  }

  useEffect(() => {
    dispatch(getActiveListHandler());
  }, [dispatch]);

  return (
    <StyledListBuilder style={{ display: hasItems ? 'block' : 'flex' }}>
      <Header>
        <IllustrationContainer>
          <BottleIllustration src={bottle} alt="bottle illustration" />
          <div style={{ marginLeft: '5px' }}>
            <Title>{"Didn't find what you need?"}</Title>
            <CustomButton onClick={() => dispatch(showCreateItem())}>
              Add Item
            </CustomButton>
          </div>
        </IllustrationContainer>
        <ListNameContainer>
          <ListName>{list.name ? list.name : 'Shopping List'}</ListName>
          <EditIcon className="material-icons-round">edit</EditIcon>
        </ListNameContainer>
      </Header>
      {!hasItems && <Text>No Items</Text>}
      {!hasItems && (
        <CartIllustrationContainer>
          <CartIllustration src={cartIllustration} alt="" />
        </CartIllustrationContainer>
      )}
      {hasItems
        ? list.data
            .filter((p) => p.category && p.category._id)
            .sort((a, b) => a.category.name.localeCompare(b.category.name))
            .map((group) => (
              <ItemsGroup
                key={group.category._id}
                group={group}
                completing={list.saved}
              />
            ))
        : null}
      <ButtonBar>
        {list.saved ? (
          <>
            <Button btnType="flat">cancel</Button>
            <Button
              btnType="raised"
              variant="secondary"
              onClick={handleComplete}
            >
              complete
            </Button>
          </>
        ) : (
          <SaveBar
            disabled={!hasItems}
            onSave={handleOnSave}
            name={name}
            setName={setName}
          />
        )}
      </ButtonBar>
    </StyledListBuilder>
  );
}

export default ListBuilder;
