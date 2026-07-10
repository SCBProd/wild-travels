import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'https://wild-travels-backend.onrender.com/api',
  withCredentials: true,
});
export type ApiError = AxiosError<{ error: string }>;
