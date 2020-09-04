import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/auth';
import infoBarReducer from './reducers/info-bar';
import thunk from 'redux-thunk';
import activeListReducer from './reducers/active-list';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  auth: authReducer,
  infoBar: infoBarReducer,
  activeList: activeListReducer,
});

const composeEnhancers = composeWithDevTools({
  serialize: true,
  latency: 0,
  features: {
    pause: true,
    lock: true,
    persist: false,
    export: true,
    import: 'custom',
    jump: true,
    skip: true,
    reorder: true,
    dispatch: true,
    test: true,
  },
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
