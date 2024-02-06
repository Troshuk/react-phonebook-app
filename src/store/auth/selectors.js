import { createSelector } from '@reduxjs/toolkit';
import { fetchUser, logIn, logOut, signUp } from './operations';

export const AuthReducerSelector = ({ authReducer }) => authReducer;

export const tokenSelector = createSelector(
  AuthReducerSelector,
  state => state.token
);

export const isLoggedInSelector = createSelector(
  AuthReducerSelector,
  state => state.isLoggedIn
);

export const userSelector = createSelector(
  AuthReducerSelector,
  state => state.user
);

export const signUpSelector = createSelector(
  AuthReducerSelector,
  state => state[signUp.typePrefix]
);

export const logInSelector = createSelector(
  AuthReducerSelector,
  state => state[logIn.typePrefix]
);

export const logOutSelector = createSelector(
  AuthReducerSelector,
  state => state[logOut.typePrefix]
);

export const fetchUserSelector = createSelector(
  AuthReducerSelector,
  state => state[fetchUser.typePrefix]
);
