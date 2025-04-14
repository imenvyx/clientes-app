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
export interface ClientListPayload {
  identificacion?: string;
  nombre?: string;
  usuarioId: string;
}

export interface AddClientFormData {
  identificacion: string;
  nombre: string;
  apellidos: string;
  celular: string;
  otroTelefono?: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: string;
  resennaPersonal: string;
  imagen?: string;
  interesFK: string;
  usuarioId: string;
}

export interface UpdateClientFormData extends AddClientFormData {
  id: string;
}

export interface LoginSuccessResponse {
  token: string;
  expiration: string;
  userid: string;
  username: string;
}

export interface Interest {
  id: string;
  descripcion: string;
}

export interface Client {
  id: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono?: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: string;
  resenaPersonal: string;
  imagen?: string;
  interesesId: string;
}
