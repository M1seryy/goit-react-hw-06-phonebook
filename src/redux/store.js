import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contactSlice';
import { filterReducer } from './filterSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'list',
  storage,
  whitelist:["contacts"]
};

const persistedReducer = persistReducer(persistConfig, contactReducer);

export const store = configureStore({
  reducer: {
    contactsList: contactReducer,
    filter: filterReducer,
    presist: persistedReducer,
  },
});
export const persistor = persistStore(store);
