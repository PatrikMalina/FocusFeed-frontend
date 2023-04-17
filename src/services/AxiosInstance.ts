import {API_URL} from '@env';
import axios from 'axios';
import store from '../state/store';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../state/action-creators';

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
    if (error.response.status === 401) {
      const {removeToken} = bindActionCreators(ActionCreators, useDispatch());
      console.log('logout user');
      removeToken();
      return;
    }
    Promise.reject(error);
  },
);

export default axiosInstance;
