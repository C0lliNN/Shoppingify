import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/auth';
import infoBarReducer from './reducers/info-bar';
import thunk from 'redux-thunk';
import activeListReducer from './reducers/active-list';
import { composeWithDevTools } from 'redux-devtools-extension';
import itemsDataReducer from './reducers/items-data';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  infoBar: infoBarReducer,
  activeList: activeListReducer,
  itemsData: itemsDataReducer,
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

const persistedReducer = persistReducer(
  {
    key: 'SHOPPINGIFY',
    storage,
    whitelist: ['auth'],
  },
  rootReducer
);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export default store;
export { persistor };
