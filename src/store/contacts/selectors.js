import { createSelector } from '@reduxjs/toolkit';
import { createContact, deleteContact, fetchContacts } from './operations';

const contactsReducerSelector = ({ contactsReducer }) => contactsReducer;

export const contactsSelector = createSelector(
  contactsReducerSelector,
  ({ items }) => items
);

export const deleteContactSelector = createSelector(
  contactsReducerSelector,
  state => state[deleteContact.typePrefix]
);

export const createContactSelector = createSelector(
  contactsReducerSelector,
  state => state[createContact.typePrefix]
);

export const fetchContactsSelector = createSelector(
  contactsReducerSelector,
  state => state[fetchContacts.typePrefix]
);
