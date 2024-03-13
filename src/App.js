import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Snackbar, Alert } from "@mui/material";
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
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseSnackbar = () => {
    setErrorSnackbarOpen(false);
    setSuccessSnackbarOpen(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  useEffect(() => {
    const requestInterceptor = setupRequestInterceptor(
      setLoading,
      setErrorMessage,
      setErrorSnackbarOpen
    );
    const responseInterceptor = setupResponseInterceptor(
      setLoading,
      setErrorMessage,
      setErrorSnackbarOpen,
      setSuccessMessage,
      setSuccessSnackbarOpen
    );

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
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
        >
          {successMessage}
        </Alert>
      </Snackbar>
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
