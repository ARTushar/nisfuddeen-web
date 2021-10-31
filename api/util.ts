import axios from 'axios';
import { getTokenHeader } from '../hooks/firebase';

const BASE_URL = '/api';

export const makeGetRequest = async (url: string, options = {}) => {
  const tokenHeader = await getTokenHeader();
  const res = await axios.get(`${BASE_URL}${url}`, {
    ...options,
    headers: tokenHeader,
  });

  return res;
};

export const makePostRequest = async (url: string, data = {}, options = {}) => {
  const tokenHeader = await getTokenHeader();
  const res = await axios.post(`${BASE_URL}${url}`, data, {
    ...options,
    headers: tokenHeader,
  });

  return res;
};

export const makePatchRequest = async (url: string, data = {}, options = {}) => {
  const tokenHeader = await getTokenHeader();
  const res = await axios.patch(`${BASE_URL}${url}`, data, {
    ...options,
    headers: tokenHeader,
  });
  return res;
};
