import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Supplier } from "@/types/supplier";
import api from "@/utils/api";

type Form = {
  name: string;
}
const get: FetchFunctionWithPagination<Supplier> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Supplier>> => {
  const response = await api.get<PaginatedResponse<Supplier>>("suppliers", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};


const getWithoutPagination = async (

): Promise<ApiResponse<Supplier[]>> => {
  const response = await api.get<ApiResponse<Supplier[]>>("suppliers");
  return response.data;
  
};

const create = async (data: Form) => {
  try {
    const response = await api.post("suppliers", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`suppliers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: Form) => {
  try {
    const response = await api.put(`suppliers/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`suppliers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const SupplierService = { get, getWithoutPagination, create, getById, update, remove };
export default SupplierService;