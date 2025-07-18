import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Machine } from "@/types/machine";
import api from "@/utils/api";

interface IForm {
  code: string;
}

const get: FetchFunctionWithPagination<Machine> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Machine>> => {
  const response = await api.get<PaginatedResponse<Machine>>("machines", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Machine[]>> => {
  const response = await api.get<ApiResponse<Machine[]>>("machines", {
    params: { keyword },
  });
  return response.data;
};

const create = async (data: IForm) => {
  try {
    const response = await api.post("machines", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`machines/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`machines/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`machines/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const MachineService = { get, getWithoutPagination, create, getById, update, remove };
export default MachineService;