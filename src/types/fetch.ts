export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    pageIndex: number;
    totalPages: number;
    pageSize: number;
    total: number;
  };
};

export type ApiResponse<T> = {
  data: T;
  message: string;
};

export type FetchFunctionWithPagination<T> = (
  pageIndex?: number,
  pageSize?: number,
  keyword?: string
) => Promise<PaginatedResponse<T>>;

export type FetchFunctionWithoutPagination<T> = (
  keyword?: string
) => Promise<ApiResponse<T[]>>;
