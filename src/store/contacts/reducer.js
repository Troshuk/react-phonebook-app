import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { createContact, deleteContact, fetchContacts } from './operations';

const getStateKey = (type, meta) => type.replace(`/${meta.requestStatus}`, '');

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    ...[createContact, deleteContact].reduce(
      (acc, operation) => ({
        ...acc,
        [operation.typePrefix]: { isLoading: false, error: null, key: null },
      }),
      {}
    ),
  },
  extraReducers: builder => {
    builder
      // Get contacts
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })

      // Create contact
      .addCase(createContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })

      // Delete contact
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(({ id }) => id !== payload.id);
      })

      // Handle fulfilled requests status
      .addMatcher(
        isAnyOf(createContact.fulfilled, deleteContact.fulfilled),
        (state, { type, meta }) => {
          state[getStateKey(type, meta)] = {
            isLoading: false,
            error: null,
            key: null,
          };
        }
      )

      // Handle Pending requests
      .addMatcher(
        isAnyOf(createContact.pending, deleteContact.pending),
        (state, { type, meta }) => {
          state[getStateKey(type, meta)] = {
            isLoading: true,
            error: null,
            key: meta.arg ?? null,
          };
        }
      )

      // Handle Rejected requests
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          createContact.rejected,
          deleteContact.rejected
        ),
        (state, { error, payload, type, meta }) => {
          state[getStateKey(type, meta)] = {
            isLoading: false,
            error: payload ?? error.message,
            key: null,
          };
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
