import axiosInstance from "./axiosInstance";

export const setupRequestInterceptor = (setLoading) => {
  return axiosInstance.interceptors.request.use(
    (request) => {
      //console.log("Starting Request", request);
      setLoading(true);
      return request;
    },
    (error) => {
      //console.error("Axios Request Error:", error);
      setLoading(false);
      return Promise.reject(error);
    }
  );
};

export const setupResponseInterceptor = (setLoading) => {
  return axiosInstance.interceptors.response.use(
    (response) => {
      //console.log("Response:", response);
      setLoading(false);
      return response;
    },
    (error) => {
      //console.error("Axios Response Error:", error);
      setLoading(false);
      return Promise.reject(error);
    }
  );
};
