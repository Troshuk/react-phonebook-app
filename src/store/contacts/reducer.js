import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { createContact, deleteContact, fetchContacts } from './operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: builder => {
    builder
      // Get contacts
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })

      // Create contact
      .addCase(createContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
      })

      // Delete contact
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = state.items.filter(({ id }) => id !== payload.id);
      })

      // Handle Pending requests
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          createContact.pending,
          deleteContact.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )

      // Handle Rejected requests
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          createContact.rejected,
          deleteContact.rejected
        ),
        (state, { error, payload }) => {
          state.isLoading = false;
          state.error = payload ?? error.message;
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
