import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  saveProductStocks,
  saveProduction,
} from "../../services/IndustryService";
import { useApiContext } from "../../context/ApiContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const StockForm = ({ products, handleClose, shortName }) => {
  const { generalSettings } = useApiContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const initialValues = {};
  const validationSchemaFields = {};

  useEffect(() => {
    // Filtrar productos según el valor de shortName
    let tempProducts;
    if (shortName === "stock") {
      tempProducts = products.filter((product) => product.for_stock === 1);
    } else if (shortName === "production") {
      tempProducts = products.filter(
        (product, index) => product.for_production === 1 && index !== 0
      );
    }
    setFilteredProducts(tempProducts || []);
  }, [products, shortName]);

  filteredProducts.forEach((product) => {
    initialValues[product.short_name] = "";
    validationSchemaFields[product.short_name] = yup
      .number()
      .required("Required");
  });

  const userSchema = yup.object().shape(validationSchemaFields);

  const handleFormSubmit = async (values) => {
    const stocks = filteredProducts.map((product) => ({
      product_id: product.id,
      tm: values[product.short_name],
    }));
    console.log(stocks);
    try {
      if (shortName === "stock") {
        await saveProductStocks(generalSettings.token, stocks);
      } else {
        await saveProduction(generalSettings.token, stocks);
      }
      //console.log("se subio con exito");
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
            {filteredProducts.map((product) => (
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
