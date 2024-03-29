import type { AxiosRequestConfig } from 'axios';
import axiosClient from 'axios';

import type { Response } from './types';

/**
 * Creates an initial 'axios' instance with custom settings.
 */
const instance = axiosClient.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'axios',
  },
});

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  }
);

/**
 * Replaces main `axios` instance with the custom-one, already typed with
 * the `Response` object.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
const axios = <T = unknown>(cfg: AxiosRequestConfig) =>
  instance.request<any, Response<T>>(cfg);

/**
 * Fetcher is created to be used with `useSWR` hook.
 *
 * @param url - URL of the endpoint.
 * @returns JSON response of the resulting request.
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'Fetch API',
    },
  });

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  const parsed = await res.json();

  return parsed.data;
};

export default axios;
