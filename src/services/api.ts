import axios, { AxiosResponse } from 'axios';
import { ClientCommon, LoginPayload, LoginSuccessResponse } from './types';

// 3. Configuración de Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// 4. Interceptor con tipado correcto
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 5. Funciones API con tipado mejorado
export const fetchClients = async (): Promise<
  AxiosResponse<ClientCommon[]>
> => {
  return api.get('api/Cliente/Listado');
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
