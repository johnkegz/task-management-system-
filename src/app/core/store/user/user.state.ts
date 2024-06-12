import { User } from '../../auth/user.model';

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  error: any;
}

export const initialUserState: UserState = {
  user: null,
  isLoggedIn: false,
  error: null
};
