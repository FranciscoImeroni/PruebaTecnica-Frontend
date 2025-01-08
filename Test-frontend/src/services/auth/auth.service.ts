import axios from 'axios';
import axiosInstance from '../../interceptor/axiosInstance';

const API_URL = 'http://localhost:3000/auth'; 

class AuthService {
  async register(username: string, password: string) {
    try {
      const response = await axiosInstance.post(`/auth/register`, { username, password });
      return response.data;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await axiosInstance.post(`/auth/login`, { email, password });
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
    }
      return response.data;
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  async fetchProtectedData() {
    try {
      const token = this.getToken();
      const response = await axios.get(`${API_URL}/protected`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos protegidos:', error);
      throw error;
    }
  }
}

export default new AuthService();
