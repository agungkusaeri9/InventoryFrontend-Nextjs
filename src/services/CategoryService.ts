import { ApiResponse } from "@/types/api";
import { Category } from "@/types/category";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";
interface IForm {
  code:string;
  name:string;
}

const get: FetchFunctionWithPagination<Category> = async (
  pageIndex = 1,
  pageSize = 10,
  keyword = ""
): Promise<PaginatedResponse<Category>> => {
  const response = await api.get<PaginatedResponse<Category>>("category", {
    params: { pageSize, keyword, pageIndex },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Category[]>> => {
  const response = await api.get<ApiResponse<Category[]>>("category", {
    params: { keyword, paginate: false },
  });
  return response.data;
};


const create = async (data: IForm) => {
  try {
    const response = await api.post("category", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`category/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`category/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    const response =  await api.delete(`category/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const CategoryService = { get,getWithoutPagination, create, getById, update, remove };
export default CategoryService;