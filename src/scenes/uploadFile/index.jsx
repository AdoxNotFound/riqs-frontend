import {
  Box,
  Button,
  useTheme,
  Table,
  CircularProgress,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
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

  const renderTableCell = (value) => <TableCell>{value}</TableCell>;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLoading(true);
    uploadWeeklyFile(generalSettings.token, file, setFileInfo);
    setLoading(false);
    const initialSelectedSheets = {};
    uploadData.forEach((row) => {
      initialSelectedSheets[row.id] = "";
    });
    setSelectedSheets(initialSelectedSheets);
  };

  const handleSheetChange = (event, rowId) => {
    setSelectedSheets({
      ...selectedSheets,
      [rowId]: event.target.value,
    });
  };

  const handleButtonClick = async (rowId) => {
    const selectedSheet = selectedSheets[rowId];

    reviewAcopio(generalSettings.token, fileInfo.data.file_name, selectedSheet);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={industrySettings.periodName}
          subtitle="Subir reporte quincenal"
        />
        <Box>
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
      </Box>

      {loading ? (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : fileInfo ? (
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
                    <Select
                      value={selectedSheets[row.id]}
                      onChange={(e) => handleSheetChange(e, row.id)}
                    >
                      {fileInfo &&
                        fileInfo.data &&
                        fileInfo.data.sheets.map((sheetName, index) => (
                          <MenuItem key={index} value={sheetName}>
                            {sheetName}
                          </MenuItem>
                        ))}
                    </Select>
                  </TableCell>
                  {renderTableCell(row.empty)}
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleButtonClick(row.id)}
                    >
                      Revisar
                    </Button>
                  </TableCell>
                  <TableCell>{row.response}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
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
  );
};

export default UploadFile;
