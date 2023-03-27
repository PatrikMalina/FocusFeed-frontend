import {API_URL} from '@env';
import axios, {AxiosResponse} from 'axios';

export async function registerUser(
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
): Promise<AxiosResponse> {
  return axios.post(`${API_URL}/auth/register`, {
    username,
    email,
    password,
    passwordConfirmation,
  });
}
