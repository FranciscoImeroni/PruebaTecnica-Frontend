import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        alert('No tienes permiso para acceder a este recurso.');
      } else if (error.response.status >= 500) {
        alert('Error en el servidor. Intenta más tarde.');
      }
    } else if (error.request) {
      alert('No se pudo contactar con el servidor. Verifica tu conexión.');
    } else {
      console.error('Error desconocido:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
