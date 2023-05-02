import { configureStore } from '@reduxjs/toolkit';

import cryptoDataReducer from './reducers/cryptoDataReducer';
import selectedYearReducer from './reducers/selectedYearReducer';

const store = configureStore({
  reducer: {
    selectedYear: selectedYearReducer,
    cryptoData: cryptoDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
