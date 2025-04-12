import axios, { AxiosResponse } from 'axios';
import { ClientCommon, LoginPayload, LoginSuccessResponse } from './types';
import { useAuth } from 'contexts/AuthContext';

// 3. Configuración de Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Función para obtener el token de localStorage
const getAuthToken = () => {
  const authData = localStorage.getItem('authData');
  if (authData) {
    try {
      const { token } = JSON.parse(authData);
      return `Bearer ${token}`;
    } catch (error) {
      return '';
    }
  }
  return '';
};
// 4. Interceptor con tipado correcto
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// 5. Funciones API con tipado mejorado
export const fetchClients = async (
  usuarioId: string,
  identificacion?: string,
  nombre?: string
): Promise<AxiosResponse<ClientCommon[]>> => {
  try {
    return api.post('api/Cliente/Listado', {
      identificacion,
      nombre,
      usuarioId,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.title);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

export const login = async (
  username: string,
  password: string
): Promise<AxiosResponse<LoginSuccessResponse>> => {
  try {
    const payload: LoginPayload = { username, password };
    return await api.post<LoginSuccessResponse>(
      'api/Authenticate/login',
      payload
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.title);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<AxiosResponse<void>> => {
  try {
    return await api.post('api/Authenticate/register', {
      username,
      email,
      password,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};
