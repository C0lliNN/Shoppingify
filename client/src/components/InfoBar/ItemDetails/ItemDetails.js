import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import BackButton from '../../BackButton/BackButton';
import * as variables from '../../../helpers/style-constants';
import { showListBuilder } from '../../../store/actions';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';
import ButtonBar from '../../ButtonBar/ButtonBar';

const Container = styled.div`
  padding: 20px 15px;
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

const ImageContainer = styled.div`
  border-radius: ${variables.BORDER_RADIUS_2};
  height: 0;
  width: 100%;
  margin: 30px auto;
  padding-bottom: 100%;
`;

const Title = styled.h4`
  font-size: ${variables.FONT_SIZE_1};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 600;
  color: #c1c1c4;
  margin-top: 30px;
`;

const Value = styled.h5`
  font-size: ${variables.FONT_SIZE_3};
  font-family: ${variables.FONT_FAMILY};
  font-weight: 600;
  margin-top: 10px;
`;

const InfoGroupWrapper = styled.div`
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    margin-bottom: 100px;
  }
`;

function ItemDetails({ item, showListBuilder }) {
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
        <Button btnType="flat">delete</Button>
        <Button btnType="raised" variant="primary">
          Add to list
        </Button>
      </ButtonBar>
    </Container>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    note: PropTypes.string,
  }),
  showListBuilder: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  showListBuilder,
};

export default connect(null, mapDispatchToProps)(ItemDetails);
