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
            {
              name: 'Apple',
              image: 'https://picsum.photos/400',
              note: 'Note',
              category: { name: 'Fruit' },
            },
            {
              name: 'Banana',
              image: 'https://picsum.photos/300/400',
              note:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim consectetur ratione inventore distinctio rerum eos sapiente nostrum impedit voluptate nulla nesciunt amet dignissimos asperiores laudantium hic porro nihil suscipit, facilis consequatur corporis repudiandae officia beatae! Voluptate laborum et harum commodi mollitia eius. Aliquam voluptatum laboriosam ipsam velit quas cum excepturi, magnam maiores, perferendis earum quam nihil perspiciatis odit, saepe ea. Repellendus magni eum ipsum magnam, quod eligendi quis recusandae corrupti temporibus labore, rerum cupiditate facilis porro atque repellat doloribus aliquid totam minus illum. Suscipit error amet reiciendis, quod eum repudiandae quaerat fugiat voluptatum corporis, vitae quisquam, vel assumenda accusamus eius!',
              category: { name: 'Fruit' },
            },
            {
              name: 'Abacate',
              category: { name: 'Fruit' },
            },
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
