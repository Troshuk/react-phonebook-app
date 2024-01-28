import { configureStore } from '@reduxjs/toolkit';

import { contactsReducer, filterReducer } from './reducers.js';

export const store = configureStore({
  reducer: {
    contactsReducer,
    filterReducer,
  },
});
