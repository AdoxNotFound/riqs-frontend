import React, { useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { router } from "./components/Routes";
import { RouterProvider, Navigate } from "react-router-dom";
import axiosInstance from "./services/axiosInstance";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "./services/axiosInterceptors";
import { useApiContext } from "./context/ApiContext";

function App() {
  const { generalSettings } = useApiContext();

  useEffect(() => {
    const requestInterceptor = setupRequestInterceptor();
    const responseInterceptor = setupResponseInterceptor();

    // Retorna una función de limpieza para desmontar los interceptores cuando el componente se desmonte
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    // Aquí puedes realizar la comprobación de inicio de sesión
    // Si el usuario no ha iniciado sesión, redirige a la página de inicio de sesión
    if (!generalSettings.isLoggedIn) {
      <Navigate to="/" />; // Redirecciona a la página de inicio de sesión
    }
  }, [generalSettings.isLoggedIn]);

  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
