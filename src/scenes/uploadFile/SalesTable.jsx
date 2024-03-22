import { useApiContext } from "../../context/ApiContext";
import React, { useState } from "react";
import { rowConfig } from "./DialogColumns";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
//import InputLabel from "@mui/material/InputLabel";
//import MenuItem from "@mui/material/MenuItem";
//import FormControl from "@mui/material/FormControl";
//import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { saveAcopio } from "../../services/IndustryService";

const SalesTable = ({ fileInfo, rowName, handleClose }) => {
  const { generalSettings } = useApiContext();
  //const [selectedSheets, setSelectedSheets] = React.useState({});
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [batch, setBatch] = useState("");

  const handleButtonClick = async () => {
    const reviewFunction = rowConfig[rowName.short_name].reviewFunction;
    reviewFunction(
      generalSettings.token,
      fileInfo.data.file_name,
      //selectedSheets,
      setRows,
      setTotal,
      setBatch
    );
  };

  const handleCloseForm = async () => {
    //setSelectedSheets({});
    saveAcopio(generalSettings.token, batch);
    setRows([]);
    setTotal(0);
    handleClose();
  };

  /*
  const handleSheetChange = (event) => {
    setSelectedSheets(event.target.value);
  };
  */

  return (
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
          <Typography>Total dólares: {total[1]}</Typography>
        ) : (
          <div />
        )}
      </div>

      <Button onClick={handleCloseForm} color="secondary" variant="contained">
        Guardar información
      </Button>
    </Box>
  );
};

export default SalesTable;
