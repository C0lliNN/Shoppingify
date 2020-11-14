import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as variables from '../../helpers/style-constants';
import logo from '../../assets/images/logo.svg';

const Container = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background-color: ${variables.COLORS.light_brown};
  border-radius: ${variables.BORDER_RADIUS_2};
  padding: 20px;
  width: 80%;
  margin: auto;
  max-width: 700px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px #0000001c;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-weight: 600;
  font-family: ${variables.FONT_FAMILY};
  font-size: ${variables.FONT_SIZE_4};
`;

function UnAuthContainer({ children, title }) {
  return (
    <Container>
      <Card>
        <TitleBar>
          <img src={logo} alt="Shoppingify" />
          <Title>{title}</Title>
          <img src={logo} alt="Shoppingify" />
        </TitleBar>
        {children}
      </Card>
    </Container>
  );
}

UnAuthContainer.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default UnAuthContainer;
