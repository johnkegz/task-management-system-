import { createAction, props } from '@ngrx/store';
import { User } from '../../auth/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ user: User }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const loadUser = createAction('[Auth] Load User', props<{ userId: string }>());
export const loadUserSuccess = createAction('[Auth] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[Auth] Load User Failure', props<{ error: any }>());
