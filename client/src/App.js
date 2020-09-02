import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';
import styled from 'styled-components';
import * as variables from './helpers/style-constants';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Items from './containers/Items/Items';

const MainContentWrapper = styled.div`
  margin-left: ${variables.NAVBAR_XS_SIZE}px;
  height: 100%;

  @media (min-width: ${variables.MD_BREAK_POINT}px) {
    margin-left: ${variables.NAVBAR_MD_SIZE}px;
    margin-right: ${variables.INFO_BAR_MD_SIZE}px;
  }
  @media (min-width: ${variables.LG_BREAK_POINT}px) {
    margin-right: ${variables.INFO_BAR_LG_SIZE}px;
  }
`;

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <NavBar />
        <MainContentWrapper>
          <Switch>
            <Route path="/" component={Items} />
          </Switch>
          <InfoBar />
        </MainContentWrapper>
      </BrowserRouter>
    </main>
  );
}

export default App;
