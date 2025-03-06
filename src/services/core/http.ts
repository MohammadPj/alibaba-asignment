import axios, {AxiosError, AxiosResponse} from 'axios';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
  }
}

const http = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10 * 1000,
});


http.interceptors.request.use(
  (config) => {

    config.headers.AlterAuthorization = `Bearer ${localStorage.getItem('token')}`
    config.headers.Accept = '*/*'

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    return Promise.reject(error);
  },
);

export { http };
