import { ApiResponse } from "@/types/fetch";
import api from "@/utils/api";

type Dashboard = {
    overStock: number;
    underStock: number;
    unBalanced: number;
    unProcessed: number;
    stockIn: {
        daily: Record<string, number>;
        weekly: Record<string, number>;
        monthly: Record<string, number>;
    };
    stockOut: {
        daily: Record<string, number>;
        weekly: Record<string, number>;
        monthly: Record<string, number>;
    };
}

const getDashboard = async (
): Promise<ApiResponse<Dashboard>> => {
  const response = await api.get<ApiResponse<Dashboard>>("statistics");
  return response.data;
};

const DashboardService = { getDashboard };

export default DashboardService;

