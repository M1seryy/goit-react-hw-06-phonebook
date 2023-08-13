import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(obj) {
        return {
          payload: obj,
        };
      },
    },
    deleteContact: {
      reducer(state, action) {
        const filteredArr = state.contacts.filter(
          item => item.id !== action.payload
        );
        state.contacts = filteredArr;
      },
      prepare(id) {
        return {
          payload: id,
        };
      },
    },
    
  },
});
export const { addContact, deleteContact, getFromStorage } =
  contactSlice.actions;
export const contactReducer = contactSlice.reducer;
