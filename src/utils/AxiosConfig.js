import axios from "axios";

// Determine the environment
const BASE_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_PRODUCTION_API_URL : import.meta.env.VITE_DEV_API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 100000,
});

// Interceptor to handle response errors and refresh token
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Check if the error status is 403 (Forbidden) and if it's not already retried
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true; // Flag the original request to prevent infinite loop

            try {
                // Attempt to refresh the token
                const refreshResponse = await axiosInstance.get('user/refresh-token'); // Adjust this path based on your API
                const newAccessToken = refreshResponse.data.accessToken;

                // Set the new access token in the axios headers for future requests
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                // Update the original request's authorization header
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Retry the original request with the new access token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // If refresh fails, clear any user data and redirect to login
                console.error("Token refresh failed:", refreshError);
                // Optionally, you can redirect to the login page or show a notification
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
