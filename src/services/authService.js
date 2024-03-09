import axiosInstance from "./axiosInstance";

// solicitudes generales para inicio y cerrado de sesion

export const userLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username: credentials.username,
      password: credentials.password,
    });
    return response;
  } catch (error) {
    console.error("Error al realizar la solicitud Axios:", error);
    throw error;
  }
};

export const userLogout = async (userToken) => {
  try {
    const response = await axiosInstance.post("/auth/logout", null, {
      headers: {
        Authorization: userToken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al realizar la solicitud Axios:", error);
    throw error;
  }
};
