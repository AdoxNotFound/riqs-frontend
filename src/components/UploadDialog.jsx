import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useApiContext } from "../context/ApiContext";
import { reviewAcopio } from "../services/IndustryService";
import { DataGrid } from "@mui/x-data-grid";

export default function ResponsiveDialog({
  open,
  handleClose,
  fileInfo,
  rowName,
}) {
  const theme = useTheme();
  const { generalSettings } = useApiContext();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedSheets, setSelectedSheets] = React.useState({});

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSheetChange = (event) => {
    setSelectedSheets(event.target.value);
  };

  const handleButtonClick = async () => {
    reviewAcopio(
      generalSettings.token,
      fileInfo.data.file_name,
      selectedSheets,
      setRows,
      setTotal
    );
  };

  const handleCancel = () => {
    setSelectedSheets({});
    setRows([]);
    setTotal(0);
    handleClose();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50, sortable: false },
    {
      field: "date_reception",
      headerName: "Fecha de Recepción",
      width: 180,
      sortable: false,
    },
    {
      field: "resume_tm_bruto",
      headerName: "Resumen TM Bruto",
      width: 180,
      type: "number",
      sortable: false,
    },
    {
      field: "resume_tm_liquido",
      headerName: "Resumen TM Líquido",
      width: 180,
      type: "number",
      sortable: false,
    },
  ];

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{rowName}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Siga los pasos para realizar la declaración del formulario.
        </DialogContentText>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-evenly"
          height={200}
        >
          <Typography>Existe movimiento ?</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>No</Typography>
            <Switch
              defaultChecked
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Si</Typography>
          </Stack>
          <Typography>
            Seleccione la hoja de excel donde se encuentra el reporte
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Hojas de excel</InputLabel>
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
          </FormControl>

          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleButtonClick()}
          >
            Revisar reporte
          </Button>
        </Box>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
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
          <Typography>Total TM Liquido: {total}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Disagree
        </Button>
        <Button onClick={handleCancel} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
