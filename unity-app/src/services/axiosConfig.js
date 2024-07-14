import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7226', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adicionando um interceptador para incluir o token de autenticação em todas as requisições
instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization header set:', `Bearer ${token}`);
    } else {
      console.log('Authorization header not set, token is undefined');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
