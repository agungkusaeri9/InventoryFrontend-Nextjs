import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Unit } from "@/types/unit";
import api from "@/utils/api";
interface IForm {
  code:string;
}

const get: FetchFunctionWithPagination<Unit> = async (
  pageIndex = 1,
  pageSize = 10,
  keyword = ""
): Promise<PaginatedResponse<Unit>> => {
  const response = await api.get<PaginatedResponse<Unit>>("unit", {
    params: { pageSize, keyword, pageIndex },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Unit[]>> => {
  const response = await api.get<ApiResponse<Unit[]>>("unit", {
    params: { keyword, paginate: false },
  });
  return response.data;
};


const create = async (data: IForm) => {
  try {
    const response = await api.post("unit", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`unit/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`unit/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    const response =  await api.delete(`unit/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const RackService = { get,getWithoutPagination, create, getById, update, remove };
export default RackService;