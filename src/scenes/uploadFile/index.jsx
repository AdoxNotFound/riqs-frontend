import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Header from "../../components/Header";
import { useApiContext } from "../../context/ApiContext";
import { tokens } from "../../theme";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  uploadWeeklyFile,
  getIndustrySettings,
  saveEmptyPeriod,
} from "../../services/IndustryService";
import ResponsiveDialog from "./UploadDialog";

// las lineas comentadas son para utilizar el selector de paginas de excel, si es que se llegará a utilizar más adelante

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
  const { generalSettings } = useApiContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState({});
  const [fileInfo, setFileInfo] = useState(null);
  //const [selectedSheets, setSelectedSheets] = useState({});
  const [industryData, setIndustryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIndustrySettings(generalSettings.token);
        setIndustryData(response.data.data); // Guardamos los datos en el estado local
      } catch (error) {
        console.error(
          "Error al obtener la configuración de la industria:",
          error
        );
      }
    };

    fetchData();
  }, [generalSettings.token, open]);

  const renderTableCell = (value) => <TableCell>{value}</TableCell>;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadWeeklyFile(generalSettings.token, file, setFileInfo);

    const initialSelectedSheets = {};
    industryData.options.forEach((row) => {
      initialSelectedSheets[row.id] = "";
    });
    //setSelectedSheets(initialSelectedSheets);
  };

  const handleClickOpen = (reportName) => {
    setOpen(true);
    setSelectedReport(reportName);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveEmptyPeriod = async () => {
    saveEmptyPeriod(generalSettings.token);
    handleCloseModal();
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: colors.primary[400],
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <React.Fragment>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title={industryData ? industryData.period.name : ""}
            subtitle="Subir reporte quincenal"
          />
        </Box>

        {fileInfo ? (
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
                  {industryData.options.map((row) => (
                    <TableRow key={row.id}>
                      {renderTableCell(row.id)}
                      {renderTableCell(row.name)}

                      <TableCell>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          disabled={row.date ? true : false}
                          onClick={() => handleClickOpen(row)}
                        >
                          Revisar
                        </Button>
                      </TableCell>
                      {renderTableCell(row.date ? "Declarado" : "Pendiente")}
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
                onClick={() => setFileInfo(null)}
              >
                Cerrar archivo
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
            <Typography variant="h5">Suba un archivo para continuar</Typography>
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
            <Typography variant="h5">Declarar sin movimiento</Typography>
            <div>
              <Button
                component="label"
                variant="contained"
                color="error"
                onClick={handleOpenModal}
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                Declarar quincena sin movimiento
              </Button>
              <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ ...style, width: 400 }}>
                  <p id="child-modal-description">
                    Esta seguro de declarar sin movimiento esta planilla?
                  </p>
                  <Button onClick={handleCloseModal} color="error">
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => handleSaveEmptyPeriod()}
                    color="secondary"
                  >
                    Continuar
                  </Button>
                </Box>
              </Modal>
            </div>
          </Box>
        )}
      </Box>
      <ResponsiveDialog
        open={open}
        handleClose={handleClose}
        fileInfo={fileInfo}
        rowName={selectedReport}
        products={industryData ? industryData.products : []}
      />
    </React.Fragment>
  );
};

export default UploadFile;
