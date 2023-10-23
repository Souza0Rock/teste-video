import axios from 'axios';

const api = 'https://hp-api.onrender.com/api/';

export const connectApi = axios.create({
  baseURL: api,
});
