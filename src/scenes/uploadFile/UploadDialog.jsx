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
import { Formik } from "formik";
import * as yup from "yup";

// las lineas comentadas son para utilizar el selector de paginas de excel, si es que se llegará a utilizar más adelante
const initialValues = {
  hss: "",
  his: "",
  cs: "",
  acs: "",
  ars: "",
  exp: "",
};

const userSchema = yup.object().shape({
  hss: yup.number().required("required"),
  his: yup.number().required("required"),
  cs: yup.number().required("required"),
  acs: yup.number().required("required"),
  ars: yup.number().required("required"),
  exp: yup.number().required("required"),
});

export default function ResponsiveDialog({
  open,
  handleClose,
  fileInfo,
  rowName,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { generalSettings } = useApiContext();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //const [selectedSheets, setSelectedSheets] = React.useState({});
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState(true);

  const handleFormSubmit = (values) => {
    console.log(values);
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
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box display="flex" flexDirection="column">
                    <TextField
                      label="Harina de soya solvente"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.hss && !!errors.hss}
                      helperText={touched.hss && errors.hss}
                      value={values.hss}
                      color="secondary"
                      name="hss"
                      sx={{ m: 2 }}
                    />
                    <TextField
                      label="Harina integral de soya"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.his && !!errors.his}
                      helperText={touched.his && errors.his}
                      value={values.his}
                      color="secondary"
                      name="his"
                      sx={{ m: 2 }}
                    />
                    <TextField
                      label="Cascarilla de soya"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.cs && !!errors.cs}
                      helperText={touched.cs && errors.cs}
                      value={values.cs}
                      color="secondary"
                      name="cs"
                      sx={{ m: 2 }}
                    />
                    <TextField
                      label="Aceite crudo de soya"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.acs && !!errors.acs}
                      helperText={touched.acs && errors.acs}
                      value={values.acs}
                      color="secondary"
                      name="acs"
                      sx={{ m: 2 }}
                    />
                    <TextField
                      label="Aceite refinado de soya"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.ars && !!errors.ars}
                      helperText={touched.ars && errors.ars}
                      value={values.ars}
                      color="secondary"
                      name="ars"
                      sx={{ m: 2 }}
                    />
                    <TextField
                      label="Expeller de soya"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.exp && !!errors.exp}
                      helperText={touched.exp && errors.exp}
                      value={values.exp}
                      color="secondary"
                      name="exp"
                      sx={{ m: 2 }}
                    />

                    <Button type="submit" color="secondary" variant="contained">
                      Create New User
                    </Button>
                  </Box>
                </form>
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
