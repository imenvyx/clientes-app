import axios, { AxiosResponse } from 'axios';
import {
  AddClientFormData,
  Client,
  ClientCommon,
  ClientListPayload,
  Interest,
  LoginPayload,
  LoginSuccessResponse,
  UpdateClientFormData,
} from './types';

const authData = localStorage.getItem('authData');

const getAuthToken = () => {
  if (authData) {
    try {
      const { token } = JSON.parse(authData) as { token: string };
      return `Bearer ${token}`;
    } catch (error) {
      return '';
    }
  }
  return '';
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  responseEncoding: 'utf8',
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

/**
 * Authenticates a user with the provided username and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<AxiosResponse<LoginSuccessResponse>>} - A promise resolving to the login success response.
 */
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(error?.response?.data?.title as string);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

/**
 * Registers a new user with the provided username, email, and password.
 *
 * @param {string} username - The username of the new user.
 * @param {string} email - The email address of the new user.
 * @param {string} password - The password for the new user.
 * @returns {Promise<AxiosResponse<void>>} - A promise resolving to the registration response.
 */
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
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        'An error occurred';
      throw new Error(errorMessage);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

/**
 * Fetches information about a specific client by their ID.
 *
 * @param {string} clientId - The ID of the client to retrieve information for.
 * @returns {Promise<AxiosResponse<Client>>} - A promise resolving to the client information.
 */
export const clientInfo = async (
  clientId: string
): Promise<AxiosResponse<Client>> => {
  try {
    return await api.get(`api/Cliente/Obtener/${clientId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        'An error occurred';
      throw new Error(errorMessage);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};
/**
 * Fetches a list of clients based on the provided filters.
 *
 * @param {ClientListPayload} data - The payload containing filters for the client list.
 * @returns - A promise resolving to the list of clients.
 */
export const fetchClients = async (
  data: ClientListPayload
): Promise<AxiosResponse<ClientCommon[]>> => {
  try {
    return await api.post('api/Cliente/Listado', {
      identificacion: data.identificacion,
      nombre: data.nombre,
      usuarioId: data.usuarioId,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        'An error occurred';
      throw new Error(errorMessage);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

/**
 * Fetches a list of interests.
 *
 * @returns - A promise resolving to the list of interests.
 */
export const fetchInterests = async (): Promise<AxiosResponse<Interest[]>> => {
  try {
    return await api.get('api/Intereses/Listado');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as { title?: string };
      throw new Error(errorData?.title || 'An error occurred');
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

/**
 * Creates a new client with the provided data.
 *
 * @param {AddClientFormData} data - The data of the client to be created.
 * @returns  - A promise resolving to the response of the client creation.
 */
export const createClient = async (
  data: AddClientFormData
): Promise<AxiosResponse<any>> => {
  try {
    return await api.post('api/Cliente/Crear', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

/**
 * Updates an existing client with the provided data.
 *
 * @param {UpdateClientFormData} data - The data of the client to be updated.
 * @returns {Promise<AxiosResponse<any>>} - A promise resolving to the response of the client update.
 */
export const updateClient = async (
  data: UpdateClientFormData
): Promise<AxiosResponse<any>> => {
  try {
    return await api.post('api/Cliente/Actualizar', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

/**
 * Deletes a client by their ID.
 *
 * @param {string} clientId - The ID of the client to be deleted.
 * @returns {Promise<AxiosResponse<any>>} - A promise resolving to the response of the client deletion.
 */
export const deleteClient = async (
  clientId: string
): Promise<AxiosResponse<any>> => {
  try {
    return await api.delete(`api/Cliente/Eliminar/${clientId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};
