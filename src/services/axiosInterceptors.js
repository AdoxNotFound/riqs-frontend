import axiosInstance from "./axiosInstance";

export const setupRequestInterceptor = () => {
  return axiosInstance.interceptors.request.use(
    (request) => {
      console.log("Starting Request", request);
      return request;
    },
    (error) => {
      console.error("Axios Request Error:", error);
      return Promise.reject(error);
    }
  );
};

export const setupResponseInterceptor = () => {
  return axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response:", response);
      return response;
    },
    (error) => {
      console.error("Axios Response Error:", error);
      return Promise.reject(error);
    }
  );
};
