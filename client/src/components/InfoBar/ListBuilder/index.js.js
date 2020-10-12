import PropTypes from 'prop-types';
import React from 'react';
import ButtonBar from '../../ButtonBar';
import Button from '../../UI/Button/Button';
import bottle from '../../../assets/images/bottle.svg';
import { connect } from 'react-redux';
import { showCreateItem } from '../../../store/actions';
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
  CartIllustration
} from './styles';

function ListBuilder({ list, showCreateItem }) {
  const [name, setName] = useState('');

  const hasItems =
    list && list.itemsGroup.filter((p) => p.category && p.category._id).length;

  function handleOnSave() {
    console.log('Saving...');
  }

  return (
    <StyledListBuilder style={{ display: hasItems ? 'block' : 'flex' }}>
      <Header>
        <IllustrationContainer>
          <BottleIllustration src={bottle} alt="bottle illustration" />
          <div style={{ marginLeft: '5px' }}>
            <Title>{"Didn't find what you need?"}</Title>
            <CustomButton onClick={showCreateItem}>Add Item</CustomButton>
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
        ? list.itemsGroup
            .filter((p) => p.category && p.category._id)
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
            <Button btnType="raised" variant="secondary">
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

ListBuilder.propTypes = {
  list: PropTypes.shape({
    itemsGroup: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
        }),
        items: PropTypes.arrayOf(
          PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            note: PropTypes.string,
            image: PropTypes.string,
            category: PropTypes.object,
          })
        ),
      })
    ),
    name: PropTypes.string.isRequired,
    saved: PropTypes.any,
  }).isRequired,
  showCreateItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    list: state.activeList,
  };
};
const mapDispatchToProps = {
  showCreateItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder);
