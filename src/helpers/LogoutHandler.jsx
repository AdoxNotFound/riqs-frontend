import { userLogout } from "../services/authService";

const LogoutHandler = (tokens, navigate) => {
  const handleLogout = async () => {
    try {
      const response = await userLogout(tokens);
      if (response && response.data) {
        console.log(response.data.data);
        // Llama a la función para limpiar los tokens o las credenciales de usuario
        //clearTokens();
        // Redirige al usuario a la página de inicio de sesión
        navigate("/");
      } else {
        console.error("La respuesta de userLogout no es válida.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud de userLogout:", error);
    }
  };
  return handleLogout;
};
export default LogoutHandler;
