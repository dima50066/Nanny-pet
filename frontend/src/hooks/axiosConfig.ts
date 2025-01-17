import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-url.com"
    : "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, null, {
          withCredentials: true,
        });
        const { accessToken } = response.data.data;

        setAuthHeader(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
