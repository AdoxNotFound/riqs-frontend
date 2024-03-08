import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { router } from "./components/Routes";
import { RouterProvider } from "react-router-dom";
import axiosInstance from "./services/axiosInstance";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "./services/axiosInterceptors";
import { LoadingBackdrop } from "./components/LoadingBackdrop";

const AppWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = setupRequestInterceptor(setLoading);
    const responseInterceptor = setupResponseInterceptor(setLoading);

    // Retorna una función de limpieza para desmontar los interceptores cuando el componente se desmonte
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  return (
    <>
      <LoadingBackdrop loading={loading} />
      {children}
    </>
  );
};

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppWrapper>
          <RouterProvider router={router} />
        </AppWrapper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
