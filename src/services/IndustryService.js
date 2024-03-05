import axiosInstance from "./axiosInstance";

const industryReconection = async (userToken) => {
  try {
    const response = await axiosInstance.get("/auth/reconection", {
      headers: {
        Authorization: userToken,
      },
    });
    return response;
  } catch (error) {
    // Verifica si el error es debido a un límite de solicitudes (status 429)
    if (error.response && error.response.status === 429) {
      // Espera un tiempo antes de reintentar
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos antes de reintentar
      // Reintenta la solicitud
      return industryReconection(userToken);
    } else {
      // Si no es un error de límite de solicitudes, relanza el error
      console.error("Error al realizar la solicitud Axios:", error);
      throw error;
    }
  }
};

export default industryReconection;
// incluir solicitudes propias del usuario industria
// /api/industry/settings
// /api/industry/import-xls
// api/industry/save-acopio
