import axiosInstance from "./axiosInstance";

const sendRequest = async (method, url, data = null, headers = null) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      headers,
    });
    return response;
  } catch (error) {
    console.error("Error al realizar la solicitud Axios:", error);
    throw error;
  }
};

export default sendRequest;
