import React from 'react';
import './App.css';
import './assets/css/tingle.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Todos from './containers/Todos/Todos';
import Form from './containers/Form/Form';
import Header from './components/Header/Header';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/create" component={Form} />
          <Route path="/" component={Todos} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
