import axios from 'axios';
import React, {createContext} from 'react';
import {BASE_URL} from '../config';
import {AuthContextType} from '../util/enums';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.ReactNode> = ({children}: any) => {
  const onRegister = (
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    console.log('on register');

    axios
      .post(`http://10.0.2.2:3333/auth/register`, {
        username,
        email,
        password,
        passwordConfirmation,
      })
      .then(res => {
        let user = res.data;
        console.log(user);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <AuthContext.Provider value={{onRegister}}>{children}</AuthContext.Provider>
  );
};
