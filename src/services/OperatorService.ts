import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Operator } from "@/types/operator";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

interface CreateOperator {
  name: string;
  nik: string;
}

const get: FetchFunctionWithPagination<Operator> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Operator>> => {
  const response = await api.get<PaginatedResponse<Operator>>("operators", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const create = async (data: CreateOperator) => {
  try {
    const response = await api.post("operators", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`operators/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: CreateOperator) => {
  try {
    const response = await api.put(`operators/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const remove = async (id: number) => {
  try {
    const response = await api.delete(`operators/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const OperatorService = { get, create, getById, update, remove };
export default OperatorService;