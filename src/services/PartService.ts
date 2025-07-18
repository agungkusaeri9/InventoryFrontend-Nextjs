import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Part } from "@/types/part";
import api from "@/utils/api";

interface IForm {
  code: string;
  balance:number;
  specification: string;
  description: string;
  min_quantity:number;
  max_quantity:number;
}

const get: FetchFunctionWithPagination<Part> = async (
  page = 1,
  limit = 10,
  keyword = "",
  machine_area_id?: number,
  department_id?: number,
  rack_id?: number
): Promise<PaginatedResponse<Part>> => {
  const response = await api.get<PaginatedResponse<Part>>("parts", {
    params: { limit, keyword, page, paginate: true, machine_area_id:machine_area_id ?? null, department_id, rack_id },
  });
  return response.data;
};

const getWithoutPagination = async (

): Promise<ApiResponse<Part[]>> => {
  const response = await api.get<ApiResponse<Part[]>>("parts");
  return response.data;
  
};

const create = async (data: IForm) => {
  try {
    const response = await api.post("parts", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`parts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: Part) => {
  try {
    const response = await api.put(`parts/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`parts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const PartService = { get, getWithoutPagination, create, getById, update, remove };
export default PartService;