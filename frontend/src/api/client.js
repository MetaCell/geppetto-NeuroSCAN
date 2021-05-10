const axios = require('axios');

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 1000,
});

export default apiClient;
