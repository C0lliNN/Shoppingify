import React from 'react';
import styled from 'styled-components';
import Title from '../../components/Title/Title';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import { useState } from 'react';
import { useEffect } from 'react';
import ItemsGroup from '../../components/ItemsGroup/ItemsGroup';
import * as variables from '../../helpers/style-constants';

const StyledItems = styled.div`
  padding: 20px;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #fafafe;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    padding: 20px 60px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: top;
  justify-content: start;
  flex-wrap: wrap;
  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    flex-wrap: nowrap;
    justify-content: space-around;
  }
`;

function Items() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          category: 'Fruits',
          items: [
            { name: 'Apple' },
            { name: 'Banana' },
            { name: 'Abacate' },
            { name: 'Orange' },
            { name: 'really Big Name' },
          ],
        },
        {
          category: 'Meat and Fish',
          items: [
            { name: 'Beef' },
            { name: 'Chicken' },
            { name: 'Perk' },
            { name: 'Fish' },
            { name: 'Salmon' },
          ],
        },
      ]);
    }, 1500);
  }, []);

  return (
    <StyledItems>
      <Header>
        <Title />
        <SearchBar />
      </Header>
      {data.map((group) => (
        <ItemsGroup key={group.category} {...group} />
      ))}
    </StyledItems>
  );
}

export default Items;
