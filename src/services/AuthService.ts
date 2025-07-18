import api from "@/utils/api";
const AuthService = {

  login: async (data : { username: string, password: string }) => {
    const { username, password } = data;
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      return response;
    } catch (error: unknown) {
      throw error;
    }
  },

  logout: async (refreshToken: string) => {
    try {
      const response = await api.post("/auth/logout",{
        refreshToken
      });
      return response;
    } catch (error: unknown) {
      throw error;
    }
  },

}
export default AuthService;
