import { ApiResponse } from "@/types/api";
import { Department } from "@/types/department";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";

type formData = {
  name: string;
  code: string;
  number: string;
}

const get: FetchFunctionWithPagination<Department> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Department>> => {
  const response = await api.get<PaginatedResponse<Department>>("departments", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Department[]>> => {
  const response = await api.get<ApiResponse<Department[]>>("departments", {
    params: { keyword },
  });
  return response.data;
  
};

const create = async (data: formData) => {
  try {
    const response = await api.post("departments", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`departments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: formData) => {
  try {
    const response = await api.put(`departments/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`departments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const DepartmentService = { get,getWithoutPagination, create, getById, update, remove };
export default DepartmentService;
