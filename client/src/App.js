import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth, getActiveListHandler, getItemsData } from './store/actions';
import Routes from './routes';

function App() {
  const dispatch = useDispatch();
  const signed = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(checkAuth());
    if (signed) {
      dispatch(getItemsData());
      dispatch(getActiveListHandler());
    }
  }, [dispatch, signed]);

  return (
    <main className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </main>
  );
}

export default App;
