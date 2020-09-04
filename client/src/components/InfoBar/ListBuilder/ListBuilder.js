import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../UI/Button/Button';
import * as variables from '../../../helpers/style-constants';
import bottle from '../../../assets/images/bottle.svg';
import { connect } from 'react-redux';
import { showCreateItem } from '../../../store/actions';

const StyledListBuilder = styled.div`
  background-color: ${variables.COLORS.light_brown};
  padding: 30px 15px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    height: 100%;
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

const Image = styled.img`
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
  cursor: pointer;
`;

function ListBuilder({ list, showCreateItem }) {
  return (
    <StyledListBuilder>
      <IllustrationContainer>
        <Image src={bottle} alt="bottle illustration" />
        <div style={{ marginLeft: '5px' }}>
          <Title>{"Didn't find what you need?"}</Title>
          <CustomButton onClick={showCreateItem}>Add Item</CustomButton>
        </div>
      </IllustrationContainer>
      <ListNameContainer>
        <ListName>{list.name}</ListName>
        <EditIcon className="material-icons-round">edit</EditIcon>
      </ListNameContainer>
      <ButtonBar>
        <Button btnType="flat">cancel</Button>
        <Button btnType="raised" variant="secondary">
          complete
        </Button>
      </ButtonBar>
    </StyledListBuilder>
  );
}

ListBuilder.propTypes = {
  list: PropTypes.shape({
    name: PropTypes.string.isRequired,
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
