import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Reminder } from "@/types/reminder";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

const get: FetchFunctionWithPagination<Reminder> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Reminder>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = {
    page,
    limit,
    paginate: true,
  };
  if(keyword) params.keyword = keyword;
  const response = await api.get<PaginatedResponse<Reminder>>("reminders", { params });
  return response.data;
};

const getCount = async (): Promise<number> => {
  const page = 1;
  const limit = 10;
  const response = await api.get("reminders", { params: { page:page,limit:limit, paginate: true } });
  const total  = response.data.pagination?.total;
  return total;
};

const ReminderService = { get, getCount };
export default ReminderService;