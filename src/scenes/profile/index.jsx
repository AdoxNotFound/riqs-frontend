import {
  Box,
  Button,
  TextField,
  IconButton,
  Paper,
  useTheme,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
//import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { changePassword } from "../../services/authService";
import { useApiContext } from "../../context/ApiContext";
import { ColorModeContext, tokens } from "../../theme";
import React, { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const userSchema = yup.object().shape({
  currentPassword: yup.string().required("Este campo es obligatorio"),
  newPassword: yup.string().required("Este campo es obligatorio"),
  confirmNewPassword: yup
    .string()
    .required("Este campo es obligatorio")
    .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden"),
});

const AccountProfile = () => {
  //const isNonMobile = useMediaQuery("(min-width:600px)");
  const { generalSettings } = useApiContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handlePasswordChange = async (values, { resetForm }) => {
    try {
      changePassword(values, generalSettings.token);
      resetForm();
    } catch (error) {
      // Handle error
      console.error("Error al realizar la solicitud:", error);
      //setErrors({ api: error.response.data.meta.errors[0] });
    }
  };

  return (
    <Box m="20px">
      <Header
        title="Configuración"
        subtitle="Edición de los parametros del usuario"
      />

      <Formik
        onSubmit={handlePasswordChange}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <Form>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-evenly"
            >
              <Paper sx={{ height: 300, width: 300 }}>
                fotografía del usuario
              </Paper>

              <Box
                display="flex"
                flexDirection="column"
                width={300}
                backgroundColor={colors.primary[400]}
                alignItems="center"
              >
                <Box
                  display="flex"
                  justifyContent="start"
                  mt="20px"
                  width={250}
                >
                  <Typography variant="h6">Cambio de contraseña</Typography>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-evenly"
                  height={300}
                  width={250}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    color="secondary"
                    type="text"
                    label="Contraseña Actual"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currentPassword}
                    name="currentPassword"
                    error={
                      !!touched.currentPassword && !!errors.currentPassword
                    }
                    helperText={
                      touched.currentPassword && errors.currentPassword
                    }
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    color="secondary"
                    label="Contraseña Nueva"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newPassword}
                    name="newPassword"
                    error={!!touched.newPassword && !!errors.newPassword}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    color="secondary"
                    type="text"
                    label="Confirmar Nueva Contraseña"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmNewPassword}
                    name="confirmNewPassword"
                    error={
                      !!touched.confirmNewPassword &&
                      !!errors.confirmNewPassword
                    }
                    helperText={
                      touched.confirmNewPassword && errors.confirmNewPassword
                    }
                  />
                </Box>

                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Cambiar contraseña
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <Box display="flex">
        <IconButton onClick={colorMode.tooggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default AccountProfile;
