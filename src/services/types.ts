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

export interface ClientFormData {
  identificacion: string; // tamaño máximo 20
  nombre: string; // tamaño máximo 100
  apellidos: string; // tamaño máximo 100
  celular: string; // tamaño máximo 20
  otroTelefono?: string; // tamaño máximo 20
  direccion: string; // tamaño máximo 200
  fNacimiento: string; // formato: "YYYY-MM-DD"
  fAfiliacion: string; // formato: "YYYY-MM-DD"
  sexo: string; // tamaño máximo 1
  resennaPersonal: string; // tamaño máximo 200
  imagen?: string; // base64 de la imagen
  interesFK: string; // UUID
  usuarioId: string; // Id usuario en sesión
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

export interface PagedResults<T> {
  pageNumber: number;
  totalPages: number;
  pageSize: number;
  currentPageSize: number;
  currentFirstIndex: number;
  currentLastIndex: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  maxPageSize: number;
  defaultPageSize: number;
  sorts: string;
  expands: string;
  filters: string;
  items: T[];
}
