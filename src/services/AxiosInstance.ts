import axios from 'axios';
import store from '../state/store';
import {unauthorized} from '../state/action-creators';
import {API_URL} from './Config';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = store.getState().session?.token;
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    console.log('req error');
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (
      error.response?.status !== undefined &&
      error.response?.status === 401
    ) {
      console.log('logout user');
      unauthorized();
      return;
    }
    Promise.reject(error);
  },
);

export default axiosInstance;
