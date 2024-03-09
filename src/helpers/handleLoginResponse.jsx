import { UserTypes } from "./UserTypes";

export const handleLoginResponse = (
  response,
  updateGeneralSettings,
  navigate
) => {
  if (response && response.data) {
    const { data } = response;
    if (data.data.token && data.data.user) {
      // Guarda la sesión
      //setTokens(data.data.token_type + " " + data.data.token);
      // Guardado de los parametros iniciales
      updateGeneralSettings({
        token: data.data.token_type + " " + data.data.token,
        username: data.data.user.username,
        role: data.data.user.role,
        isLoggedIn: true,
      });

      if (data.data.user.role === UserTypes[0]) {
        return navigate("/home");
      } else if (data.data.user.role === UserTypes[1]) {
        return navigate("/home");
      }
    } else {
      console.error("La respuesta no contiene token o user.");
    }
  } else {
    console.error("La respuesta no es válida.");
  }
};
