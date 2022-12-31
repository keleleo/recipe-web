import axios, { AxiosRequestConfig } from 'axios';

export class ServiceBase {
  constructor() {
    axios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
      if (!config.headers) return config;
      config.baseURL = process.env.API_URL;
      config.headers['Content-Type'] = 'application/json';
      return config;
    });
  }
}
