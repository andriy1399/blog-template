export interface BaseResponse<T> {
  data: T | null;
  error: ErrorResponse | null;
  meta?: MetaData;
  status: "success" | "error";
  statusCode: number;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
}

export interface MetaData {
  pagination?: Pagination;
  [key: string]: any;
}

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
