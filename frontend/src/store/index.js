import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import userReducer from './userData';
import hospitalReducer from './hospitalData';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['hospital']
};

const hospitalPersistConfig = {
  key: 'hospital',
  storage,
  // whitelist: ['hospitalData']
  blacklist: ['filteredHospitalData', 'mapInstance', 'isLoading', 'position', 'error']
};

export const rootReducer = combineReducers({
  user: userReducer,
  hospital: persistReducer(hospitalPersistConfig, hospitalReducer)
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] }
  })
});

export const persistor = persistStore(store);
