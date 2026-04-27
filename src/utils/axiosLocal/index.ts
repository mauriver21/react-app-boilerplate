import axios from 'axios';

export const BASE_LOCAL_URL = import.meta.env.BASE_LOCAL_URL;
export const axiosLocal = axios.create({
  baseURL: BASE_LOCAL_URL,
});
