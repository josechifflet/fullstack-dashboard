import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CryptoData } from '../../components/Table/SymbolsTable';

interface CryptoDataState {
  data: CryptoData[];
}

const initialState: CryptoDataState = {
  data: [],
};

export const cryptoDataSlice = createSlice({
  name: 'cryptoData',
  initialState,
  reducers: {
    updateCryptoData: (state, action: PayloadAction<CryptoData>) => {
      const index = state.data.findIndex(
        (item) => item.symbol === action.payload.symbol
      );
      if (index >= 0) {
        state.data[index] = action.payload;
      } else {
        state.data.push(action.payload);
      }
    },
  },
});

export const { updateCryptoData } = cryptoDataSlice.actions;

export default cryptoDataSlice.reducer;
