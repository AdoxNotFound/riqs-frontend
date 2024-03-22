import axiosInstance from "./axiosInstance";

// solicitudes generales para inicio y cerrado de sesión

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

export const changePassword = async (credentials, userToken) => {
  const data = {
    current_password: credentials.currentPassword,
    new_password: credentials.newPassword,
    new_password_confirmation: credentials.confirmNewPassword,
  };

  const headers = {
    Accept: "application/json",
    Authorization: userToken,
  };

  try {
    const response = await axiosInstance.post("/auth/changepassword", data, {
      headers,
    });
    //return response;
    if (response && response.data) {
      console.log(response.data);
    } else {
      console.error("La respuesta de userLogout no es válida.");
    }
  } catch (error) {
    console.error("Error al realizar la solicitud Axios:", error);
    throw error;
  }
};
