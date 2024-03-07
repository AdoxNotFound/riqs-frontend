import {
  Box,
  Button,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Checkbox,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../../components/Header";
import { useApiContext } from "../../context/ApiContext";
import { tokens } from "../../theme";
import { uploadData } from "../../data/uploadData";
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadWeeklyFile, reviewAcopio } from "../../services/IndustryService";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadFile = () => {
  const { industrySettings, generalSettings } = useApiContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [fileInfo, setFileInfo] = useState(null);
  const [selectedSheets, setSelectedSheets] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviewEnabled, setReviewEnabled] = useState(false);

  const renderTableCell = (value) => <TableCell>{value}</TableCell>;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLoading(true);
    uploadWeeklyFile(generalSettings.token, file, setFileInfo);

    const initialSelectedSheets = {};
    uploadData.forEach((row) => {
      initialSelectedSheets[row.id] = "";
    });
    setSelectedSheets(initialSelectedSheets);
    setLoading(false);
  };

  const handleSheetChange = (event, rowId) => {
    setSelectedSheets({
      ...selectedSheets,
      [rowId]: event.target.value,
    });
  };

  const handleCheckboxChange = (event, rowId) => {
    setReviewEnabled({
      ...reviewEnabled,
      [rowId]: event.target.checked,
    });
  };

  const handleButtonClick = async (rowId) => {
    const selectedSheet = selectedSheets[rowId];

    /*
  let apiEndpoint;
      switch (rowId) {
        case 1:
          apiEndpoint = "api1";
          break;
        case 2:
          apiEndpoint = "api2";
          break;
        case 3:
          apiEndpoint = "api3";
          break;
        case 4:
          apiEndpoint = "api4";
          break;
        case 5:
          apiEndpoint = "api5";
          break;
        default:
          // En caso de que no haya un endpoint definido para la fila
          return;
      }
  
      */

    reviewAcopio(
      generalSettings.token,
      fileInfo.data.file_name,
      selectedSheet /* apiEndpoint */
    );
  };

  const renderSelector = (rowId) => (
    <Select
      value={selectedSheets[rowId] || ""}
      onChange={(e) => handleSheetChange(e, rowId)}
    >
      {fileInfo &&
        fileInfo.data &&
        fileInfo.data.sheets.map((sheetName, index) => (
          <MenuItem key={index} value={sheetName}>
            {sheetName}
          </MenuItem>
        ))}
    </Select>
  );

  const renderSelectorButton = () => (
    <Button variant="outlined" color="secondary" size="small">
      Ingresar
    </Button>
  );

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={industrySettings.periodName}
          subtitle="Subir reporte quincenal"
        />
      </Box>

      {loading ? (
        <Box alignItems="center" mt={2} height={500} display="flex">
          <CircularProgress color="secondary" />
        </Box>
      ) : fileInfo ? (
        <Box>
          <TableContainer sx={{ m: "40px 0 0 0", height: "90vh" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>N</TableCell>
                  <TableCell>Reportes</TableCell>
                  <TableCell>Selector</TableCell>
                  <TableCell>Movimiento</TableCell>
                  <TableCell>Revisar</TableCell>
                  <TableCell>Respuesta</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploadData.map((row) => (
                  <TableRow key={row.id}>
                    {renderTableCell(row.id)}
                    {renderTableCell(row.reportName)}
                    <TableCell>
                      {row.id <= 3
                        ? renderSelector(row.id)
                        : renderSelectorButton()}
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        color="secondary"
                        checked={reviewEnabled[row.id] || false}
                        onChange={(e) => handleCheckboxChange(e, row.id)}
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleButtonClick(row.id)}
                        disabled={!reviewEnabled[row.id]}
                      >
                        Revisar
                      </Button>
                    </TableCell>
                    {renderTableCell(row.response)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="space-evenly" m="10">
            <Button
              sx={{
                mb: 1,
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
              }}
            >
              Cancelar
            </Button>
            <Button
              sx={{
                mb: 1,
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
              }}
              disabled
            >
              Finalizar
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          height={400}
          flexDirection="column"
        >
          <Typography variant="h4">Suba un archivo para continuar</Typography>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Subir archivo
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UploadFile;
