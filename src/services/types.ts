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
