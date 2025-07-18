import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Maker } from "@/types/maker";
import api from "@/utils/api";

type formData = {
  name:string;
}
const get: FetchFunctionWithPagination<Maker> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Maker>> => {
  const response = await api.get<PaginatedResponse<Maker>>("makers", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};


const getWithoutPagination = async (

): Promise<ApiResponse<Maker[]>> => {
  const response = await api.get<ApiResponse<Maker[]>>("makers");
  return response.data;
  
};

const create = async (data: formData) => {
  try {
    const response = await api.post("makers", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`makers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: formData) => {
  try {
    const response = await api.put(`makers/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`makers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const MakerService =  { get, getWithoutPagination, create, getById, update, remove };
export default MakerService;