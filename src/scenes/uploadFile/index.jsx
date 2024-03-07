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
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../../components/Header";
import { useApiContext } from "../../context/ApiContext";
import { tokens } from "../../theme";
import { uploadData } from "../../data/uploadData";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadWeeklyFile, reviewAcopio } from "../../services/IndustryService";
import ResponsiveDialog from "../../components/UploadDialog";

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

  const [open, setOpen] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState(null);

  const [fileInfo, setFileInfo] = useState(null);
  const [selectedSheets, setSelectedSheets] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleButtonClick = async (rowId) => {
    const selectedSheet = selectedSheets[rowId];
    reviewAcopio(generalSettings.token, fileInfo.data.file_name, selectedSheet);
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

  const handleClickOpen = (reportName) => {
    setOpen(true);
    setSelectedReport(reportName);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
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
            <Typography>
              Nombre del archivo: {fileInfo.data.file_name}
            </Typography>
            <TableContainer sx={{ m: "40px 0 0 0", height: "90vh" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>N</TableCell>
                    <TableCell>Reportes</TableCell>
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
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => handleClickOpen(row.reportName)}
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
      <ResponsiveDialog
        open={open}
        handleClose={handleClose}
        fileInfo={fileInfo}
        rowName={selectedReport}
      />
    </React.Fragment>
  );
};

export default UploadFile;
