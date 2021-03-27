import axios from 'axios'

export const apiRoot = 'http://localhost:3000/api';


const setHeaders = () => {
  const token = localStorage.getItem('token_todo');
  if (token) {
    return {
      'Authorization': `Bearer ${token}`
    }
  }
  return {}
}

const bootstrap = () => {
  const config = {
    baseURL: apiRoot
  }

  config.headers = setHeaders();
  return config;
}

const service = axios.create(bootstrap());

service.interceptors.request.use(
  config => {
    config.headers = setHeaders();
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default service
