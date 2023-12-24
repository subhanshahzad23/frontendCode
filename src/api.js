import axios from 'axios';
import { jwtDecode } from "jwt-decode";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL; 
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  async (config) => {
    let token=localStorage.getItem('token');
    
    if (token) {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
        return Promise.reject('Token expired');
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config)
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

export default axios;
