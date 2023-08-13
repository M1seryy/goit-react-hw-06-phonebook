import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterReducer: {
      reducer(state, action) {
        state.filter = action.payload;
      },
      prepare(obj) {
        return {
          payload: obj,
        };
      },
    },
  },
});
export const { setFilterReducer } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
