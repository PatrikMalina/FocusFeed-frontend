import {AxiosResponse} from 'axios';
import axiosInstance from './AxiosInstance';

export async function checkMe(): Promise<AxiosResponse> {
  return axiosInstance.get('auth/me');
}
