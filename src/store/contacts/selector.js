import { createSelector } from '@reduxjs/toolkit';

const contactsReducerSelector = ({ contactsReducer }) => contactsReducer;

export const contactsSelector = createSelector(
  contactsReducerSelector,
  ({ items }) => items
);
