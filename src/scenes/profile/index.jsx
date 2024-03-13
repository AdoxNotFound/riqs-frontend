import { Box, Button, TextField, Paper, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
//import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { changePassword } from "../../services/authService";
import { useApiContext } from "../../context/ApiContext";
import { tokens } from "../../theme";
import * as React from "react";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const userSchema = yup.object().shape({
  currentPassword: yup.string().required("Please enter a password"),
  newPassword: yup.string().required("Please enter a password"),
  confirmNewPassword: yup
    .string()
    .required("required")
    .oneOf([yup.ref("newPassword")], "Passwords does not match"),
});

const AccountProfile = () => {
  //const isNonMobile = useMediaQuery("(min-width:600px)");
  const { generalSettings } = useApiContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
                justifyContent="space-evenly"
                height={300}
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
                  error={!!touched.currentPassword && !!errors.currentPassword}
                  helperText={touched.currentPassword && errors.currentPassword}
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
                    !!touched.confirmNewPassword && !!errors.confirmNewPassword
                  }
                  helperText={
                    touched.confirmNewPassword && errors.confirmNewPassword
                  }
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cambiar contraseña
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AccountProfile;
