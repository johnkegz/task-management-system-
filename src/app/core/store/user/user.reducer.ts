import { createReducer, on } from '@ngrx/store';
import { initialUserState, UserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.login, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: false,
    error: null
  })),
  on(UserActions.logout, state => ({
    ...state,
    user: null,
    isLoggedIn: false,
    error: null
  })),
  on(UserActions.logoutSuccess, state => ({
    ...state,
    user: null,
    isLoggedIn: false,
    error: null
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: true,
    error: null
  })),
  on(UserActions.loadUserFailure, (state, error) => ({
    ...state,
    user: null,
    isLoggedIn: false,
    error: error
  }))
);
