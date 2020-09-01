import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './reducers/auth';
import infoBarReducer from './reducers/info-bar';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  infoBar: infoBarReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
