export interface ClientCommon {
  id: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginSuccessResponse {
  token: string;
  expiration: string;
  userid: string;
  username: string;
}
