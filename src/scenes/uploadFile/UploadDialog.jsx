import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
//import InputLabel from "@mui/material/InputLabel";
//import MenuItem from "@mui/material/MenuItem";
//import FormControl from "@mui/material/FormControl";
//import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useApiContext } from "../../context/ApiContext";
import { DataGrid } from "@mui/x-data-grid";
import { rowConfig } from "./DialogColumns";
import { tokens } from "../../theme";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { saveProductStocks } from "../../services/IndustryService";

// las lineas comentadas son para utilizar el selector de paginas de excel, si es que se llegará a utilizar más adelante

export default function ResponsiveDialog({
  open,
  handleClose,
  fileInfo,
  rowName,
  products,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { generalSettings } = useApiContext();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //const [selectedSheets, setSelectedSheets] = React.useState({});
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState(true);

  const initialValues = {};
  const validationSchemaFields = {};

  products.forEach((product) => {
    initialValues[product.short_name] = "";
    validationSchemaFields[product.short_name] = yup
      .number()
      .required("Required");
  });

  const userSchema = yup.object().shape(validationSchemaFields);

  const handleFormSubmit = (values) => {
    const stocks = products.map((product) => ({
      product_id: product.id,
      tm: values[product.short_name],
    }));
    console.log(stocks);
    try {
      saveProductStocks(generalSettings.token, stocks);
      console.log("se subio con exito");
    } catch (error) {
      console.error(
        "Error al obtener la configuración de la industria:",
        error
      );
    }
  };
  /*
  const handleSheetChange = (event) => {
    setSelectedSheets(event.target.value);
  };
  */
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleButtonClick = async () => {
    const reviewFunction = rowConfig[rowName.short_name].reviewFunction;
    reviewFunction(
      generalSettings.token,
      fileInfo.data.file_name,
      //selectedSheets,
      setRows,
      setTotal
    );
  };

  const handleCancel = () => {
    //setSelectedSheets({});
    setRows([]);
    setTotal(0);
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{ backgroundColor: colors.primary[400] }}
      >
        {rowName.name}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
        <DialogContentText>
          Siga los pasos para realizar la declaración del formulario.
        </DialogContentText>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
          height="auto"
          my={3}
        >
          <Typography>¿Existió movimiento durante la quincena?</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>No</Typography>
            <Switch
              color="secondary"
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Si</Typography>
          </Stack>
        </Box>
        {/* función para definir que columnas y que api se utilizará */}
        {checked ? (
          rowConfig[rowName.short_name] &&
          rowConfig[rowName.short_name].simpleDialog ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-evenly"
              height="auto"
            >
              {/* <Typography>
              Seleccione la hoja de excel donde se encuentra el reporte
            </Typography>
            <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">
                Hojas de excel
              </InputLabel>
              <Select
                label="xlsx-sheet"
                value={selectedSheets}
                onChange={handleSheetChange}
              >
                {fileInfo &&
                  fileInfo.data &&
                  fileInfo.data.sheets.map((sheetName, index) => (
                    <MenuItem key={index} value={sheetName}>
                      {sheetName}
                    </MenuItem>
                  ))}

                <MenuItem value="">
                  <em>Ninguna</em>
                </MenuItem>
              </Select>
                  </FormControl>*/}

              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleButtonClick()}
                sx={{ mb: 2 }}
              >
                Revisar reporte
              </Button>

              <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={rowConfig[rowName.short_name].columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableColumnSelector
                  disableRowSelectionOnClick
                  disableColumnMenu
                  hideFooter
                  density="compact"
                  columnVisibilityModel={{
                    // Hide columns status and traderName, the other columns will remain visible
                    id: false,
                  }}
                />
                {rowName.short_name === "acopio" ? (
                  <Typography>Total TM Liquido: {total}</Typography>
                ) : (
                  <div />
                )}
                {rowName.short_name === "priceclosing" ? (
                  <Typography>Total TM recibido: {total[0]}</Typography>
                ) : (
                  <div />
                )}
                {rowName.short_name === "priceclosing" ? (
                  <Typography>Total dolares: {total[1]}</Typography>
                ) : (
                  <div />
                )}
              </div>
            </Box>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={userSchema}
              onSubmit={handleFormSubmit}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <Form>
                  {products.map((product) => (
                    <TextField
                      key={product.id}
                      label={product.name}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched[product.short_name] &&
                        !!errors[product.short_name]
                      }
                      helperText={
                        touched[product.short_name] &&
                        errors[product.short_name]
                      }
                      value={values[product.short_name]}
                      color="secondary"
                      name={product.short_name}
                      sx={{ m: 2 }}
                    />
                  ))}

                  <Button type="submit" color="secondary" variant="contained">
                    Create New User
                  </Button>
                </Form>
              )}
            </Formik>
          )
        ) : (
          <div>declarar sin movimiento</div>
        )}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
        <Button autoFocus onClick={handleCancel} color="secondary">
          Disagree
        </Button>
        <Button onClick={handleCancel} autoFocus color="secondary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
