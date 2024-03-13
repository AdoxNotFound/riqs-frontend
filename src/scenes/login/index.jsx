import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useApiContext } from "../../context/ApiContext";
import { useNavigate } from "react-router-dom";
import { handleLoginResponse } from "../../helpers/handleLoginResponse";
import { userLogin } from "../../services/authService";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const Login = () => {
  const { updateGeneralSettings } = useApiContext();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Usuario requerido"),
    password: Yup.string().required("Contraseña requerida"),
  });

  const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
    //console.log("Form values:", values);
    try {
      const response = await userLogin(values);
      // Handle response
      handleLoginResponse(response, updateGeneralSettings, navigate);
    } catch (error) {
      // Handle error
      //console.error("Error al realizar la solicitud:", error);
      setErrors({ api: error.response.data.meta.errors[0] });
    }
    setSubmitting(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <img src="/green_logo.svg" alt="RIQS logo" width={130} />
            <Typography variant="h2">RIQS</Typography>
          </Box>

          <Typography variant="h5">Iniciar sesión</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, errors, touched, handleBlur, handleChange }) => (
              <Form>
                <TextField
                  margin="normal"
                  variant="filled"
                  required
                  fullWidth
                  color="secondary"
                  id="username"
                  label="Usuario"
                  name="username"
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  margin="normal"
                  variant="filled"
                  required
                  color="secondary"
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/*errors.api && <div style={{ color: "red" }}>{errors.api}</div>*/}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
      {/* background image */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default Login;
