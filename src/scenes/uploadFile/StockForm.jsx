import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { saveProductStocks } from "../../services/IndustryService";
import { useApiContext } from "../../context/ApiContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const StockForm = ({ products, handleClose }) => {
  const { generalSettings } = useApiContext();
  const initialValues = {};
  const validationSchemaFields = {};

  products.forEach((product) => {
    initialValues[product.short_name] = "";
    validationSchemaFields[product.short_name] = yup
      .number()
      .required("Required");
  });

  const userSchema = yup.object().shape(validationSchemaFields);

  const handleFormSubmit = async (values) => {
    const stocks = products.map((product) => ({
      product_id: product.id,
      tm: values[product.short_name],
    }));
    console.log(stocks);
    try {
      await saveProductStocks(generalSettings.token, stocks);
      console.log("se subio con exito");
      handleClose();
    } catch (error) {
      console.error(
        "Error al obtener la configuración de la industria:",
        error
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, touched, handleBlur, handleChange }) => (
        <Form>
          <Box display="flex" flexDirection="column" alignItems="center">
            {products.map((product) => (
              <TextField
                key={product.id}
                label={product.name}
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={
                  !!touched[product.short_name] && !!errors[product.short_name]
                }
                helperText={
                  touched[product.short_name] && errors[product.short_name]
                }
                value={values[product.short_name]}
                color="secondary"
                name={product.short_name}
                sx={{ m: 2, width: "50%" }}
              />
            ))}

            <Button type="submit" color="secondary" variant="contained">
              Guardar información
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default StockForm;
