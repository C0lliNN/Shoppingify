import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth, getItemsData } from './store/actions';
import Routes from './routes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getItemsData());
  }, [dispatch]);

  return (
    <main className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </main>
  );
}

export default App;
