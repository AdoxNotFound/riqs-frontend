import axiosInstance from "./axiosInstance";

export const setupRequestInterceptor = (
  setLoading,
  setErrorMessage,
  setErrorSnackbarOpen
) => {
  return axiosInstance.interceptors.request.use(
    (request) => {
      console.log("Starting Request", request);
      setLoading(true);
      return request;
    },
    (error) => {
      console.error("Axios Request Error:", error);
      setErrorMessage("No hay respuesta del servidor");
      setErrorSnackbarOpen(true);
      setLoading(false);
      return Promise.reject(error);
    }
  );
};

export const setupResponseInterceptor = (
  setLoading,
  setErrorMessage,
  setErrorSnackbarOpen,
  setSuccessMessage,
  setSuccessSnackbarOpen
) => {
  return axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response:", response);
      if (typeof response.data.data[0] === "string") {
        setSuccessMessage(response.data.data[0]);
      } else {
        setSuccessMessage("Acceso con éxito");
      }

      setSuccessSnackbarOpen(true);
      setLoading(false);
      return response;
    },
    (error) => {
      console.error("Axios Response Error:", error);
      setErrorMessage(
        error.response.data.meta.errors[0] || "Error desconocido"
      );
      setErrorSnackbarOpen(true);
      setLoading(false);
      return Promise.reject(error);
    }
  );
};
