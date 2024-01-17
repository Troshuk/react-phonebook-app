import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], filter: '' },
  reducers: {
    createContact: {
      reducer({ contacts }, { payload }) {
        contacts.push(payload);
      },
      prepare: contact => ({
        payload: {
          ...contact,
          id: nanoid(),
        },
      }),
    },

    deleteContact: ({ contacts }, { payload }) =>
      contacts.filter(({ id }) => id !== payload),

    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { createContact, deleteContact, setFilter } =
  contactsSlice.actions;
