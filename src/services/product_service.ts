import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Product } from "@/types/product";
import api from "@/utils/api";
interface IForm {
  code: string;
  name: string;
  description: string;
  price: string;
  categoryId: number;
  unitId: number;
  stock: number;
  image?: File;
}
const get: FetchFunctionWithPagination<Product> = async (
  pageIndex = 1,
  pageSize = 10,
  keyword = ""
): Promise<PaginatedResponse<Product>> => {
  const response = await api.get<PaginatedResponse<Product>>("product", {
    params: { pageSize, keyword, pageIndex },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Product[]>> => {
  const response = await api.get<ApiResponse<Product[]>>("product", {
    params: { keyword, paginate: false },
  });
  return response.data;
};


const create = async (data: IForm) => {
  try {
    const response = await api.post("product", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`product/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    const response =  await api.delete(`product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const ProductService = { get,getWithoutPagination, create, getById, update, remove };
export default ProductService;