import { createSelector } from 'reselect';
import { contactsSelector } from 'store/selectors';

export const filterSelector = ({ filterReducer }) => filterReducer;

export const filteredContactsSelector = createSelector(
  [contactsSelector, filterSelector],
  (contacts, filter) =>
    contacts?.filter(({ name, phone }) =>
      name
        .concat(': ', phone)
        .toLowerCase()
        .includes(filter.toLowerCase().trim())
    )
);
