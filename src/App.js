import React, { useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { router } from "./components/Routes";
import { RouterProvider } from "react-router-dom";
import axiosInstance from "./services/axiosInstance";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "./services/axiosInterceptors";

function App() {
  useEffect(() => {
    const requestInterceptor = setupRequestInterceptor();
    const responseInterceptor = setupResponseInterceptor();

    // Retorna una función de limpieza para desmontar los interceptores cuando el componente se desmonte
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

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
