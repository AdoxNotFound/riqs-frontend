import { useState } from "react";

const useToken = () => {
  const getTokens = () => {
    // Intenta obtener el token de sessionStorage
    const tokenString = sessionStorage.getItem("tokens");

    // Intenta analizar el tokenString a JSON
    const sTokens = JSON.parse(tokenString);
    // Retorna el token solo si se pudo analizar correctamente
    return sTokens;
  };

  const [sTokens, setTokens] = useState(getTokens());

  const saveTokens = (apiResponse) => {
    // Almacenar la respuesta de la API en sessionStorage
    sessionStorage.setItem("tokens", JSON.stringify(apiResponse));

    // Actualizar el estado con los nuevos tokens
    setTokens(apiResponse);
  };

  const clearTokens = () => {
    // Eliminar el token de sessionStorage
    console.log("Clearing tokens...");
    sessionStorage.removeItem("tokens");

    // Establecer el estado de tokens como null
    setTokens(null);
  };

  return {
    setTokens: saveTokens,
    clearTokens,
    sTokens,
  };
};

export default useToken;
