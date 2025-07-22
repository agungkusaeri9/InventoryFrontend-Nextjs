import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { User } from "@/types/user";
import api from "@/utils/api";
interface IForm {
  name:string;
  username: string;
  email: string;
  password: string;
  role: number;
}

const get: FetchFunctionWithPagination<User> = async (
  pageIndex = 1,
  pageSize = 10,
  keyword = ""
): Promise<PaginatedResponse<User>> => {
  const response = await api.get<PaginatedResponse<User>>("user", {
    params: { pageSize, keyword, pageIndex },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<User[]>> => {
  const response = await api.get<ApiResponse<User[]>>("user", {
    params: { keyword, paginate: false },
  });
  return response.data;
};


const create = async (data: IForm) => {
  try {
    const response = await api.post("user", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`user/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    const response =  await api.delete(`user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const UserService = { get,getWithoutPagination, create, getById, update, remove };
export default UserService;