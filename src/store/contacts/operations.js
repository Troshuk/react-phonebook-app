import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const api = axios.create({
  baseURL: 'https://65ab32c3fcd1c9dcffc62bda.mockapi.io/',
});

const CONTACTS_ENDPOINT = 'contacts/';

export const fetchContacts = createAsyncThunk(
  'contacts/get',
  async () => (await api.get(CONTACTS_ENDPOINT)).data
);

export const createContact = createAsyncThunk(
  'contacts/create',
  async contact => (await api.post(CONTACTS_ENDPOINT, contact)).data
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async id => (await api.delete(CONTACTS_ENDPOINT + id)).data
);
