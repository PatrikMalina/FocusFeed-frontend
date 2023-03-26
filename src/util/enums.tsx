export enum CustomTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export interface User {
  id: number;
  username: string;
  picture_url: string;
}
export type AuthContextType = {
  user?: User;
  onRegister: (
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => void;
  // saveTodo: (todo: ITodo) => void;
  // updateTodo: (id: number) => void;
};
