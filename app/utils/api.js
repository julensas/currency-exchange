import axios from 'axios';

const commonHeaders = {
  Authorization: 'Token e140ef89a18c43169b81cb2555fcf9fd',
  'Content-Type': 'application/json',
};

export const Api = axios.create({
  baseURL: 'api/',
  responseType: 'json',
  headers: commonHeaders,
});
