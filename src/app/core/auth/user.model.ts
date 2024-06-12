export interface User {
  username: string;
  email?: string;
  password: string;
}

export interface ExistingUser extends User {
  id: string;
}

export const initialUser: ExistingUser = {
  username: '',
  email: '',
  password: '',
  id: '',
};
