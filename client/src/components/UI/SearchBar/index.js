import React from 'react';
import { StyledSearchBar, IconContainer, Icon, Input } from './styles';

function SearchBar() {
  return (
    <StyledSearchBar>
      <IconContainer>
        <Icon className="material-icons-round">search</Icon>
      </IconContainer>
      <Input placeholder="Search item" />
    </StyledSearchBar>
  );
}

export default SearchBar;
