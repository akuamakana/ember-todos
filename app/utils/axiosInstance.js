import ENV from 'ember-todos/config/environment';
import axios from 'axios';
import { getCookie } from './getCookie';

const axiosInstance = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    Authorization: `Bearer ${getCookie('token')}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default axiosInstance;
