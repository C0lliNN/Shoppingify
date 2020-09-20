import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ButtonBar from '../../ButtonBar';
import Button from '../../UI/Button/Button';
import * as variables from '../../../helpers/style-constants';
import bottle from '../../../assets/images/bottle.svg';
import { connect } from 'react-redux';
import { showCreateItem } from '../../../store/actions';
import { useState } from 'react';
import cartIllustration from '../../../assets/images/shopping.svg';
import SaveBar from './SaveBar/SaveBar';
import ItemsGroup from './ItemsGroup/ItemsGroup';

const StyledListBuilder = styled.div`
  background-color: ${variables.COLORS.light_brown};
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    padding-bottom: 120px;
  }
`;

const IllustrationContainer = styled.div`
  background-color: ${variables.COLORS.burgundy};
  width: 100%;
  height: 110px;
  padding: 15px 0px;
  border-radius: ${variables.BORDER_RADIUS_2};
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
`;

const Title = styled.h3`
  font-size: ${variables.FONT_SIZE_2};
  color: ${variables.COLORS.white};
  font-weight: 600;
`;

const BottleIllustration = styled.img`
  width: 70px;
  margin-top: -35px;
`;

const CustomButton = styled.button`
  background-color: ${variables.COLORS.white};
  border-radius: ${variables.BORDER_RADIUS_1};
  padding: 8px 25px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  outline: none;
  font-family: ${variables.FONT_FAMILY};
  margin-top: 10px;
`;

const ListNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  justify-content: space-between;
`;

const ListName = styled.h3`
  font-size: ${variables.FONT_SIZE_4};
  font-weight: 600;
`;

const EditIcon = styled.i`
  font-size: ${variables.FONT_SIZE_4};
  color: ${variables.COLORS.black_2};
`;

const Header = styled.div`
  width: 100%;
`;

const Text = styled.p`
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_3};
  font-weight: 600;
`;

const CartIllustrationContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const CartIllustration = styled.img`
  width: 80%;
  max-width: 245px;
  margin: auto;
`;

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
