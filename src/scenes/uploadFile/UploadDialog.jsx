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
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { rowConfig } from "./DialogColumns";
import { tokens } from "../../theme";
import { useApiContext } from "../../context/ApiContext";
import StockForm from "./StockForm";
import SalesTable from "./SalesTable";
import { saveEmptyOption } from "../../services/IndustryService";
import Modal from "@mui/material/Modal";

export default function ResponsiveDialog({
  open,
  handleClose,
  fileInfo,
  rowName,
  products,
}) {
  const { generalSettings } = useApiContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleCancel = () => {
    //setSelectedSheets({});
    //setRows([]);
    //setTotal(0);
    handleClose();
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

  const handleCloseForm = async () => {
    try {
      console.log(rowName.short_name);
      await saveEmptyOption(generalSettings.token, rowName.short_name);
      //console.log("se subio con exito");
      handleCloseModal();
      handleClose();
    } catch (error) {
      console.error(
        "Error al obtener la configuración de la industria:",
        error
      );
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      scroll="body"
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
            <SalesTable
              fileInfo={fileInfo}
              rowName={rowName}
              handleClose={handleClose}
            />
          ) : (
            <StockForm
              products={products}
              handleClose={handleClose}
              shortName={rowName.short_name}
            />
          )
        ) : (
          <div>
            <React.Fragment>
              <Box display="flex" justifyContent="center">
                <Button
                  onClick={handleOpenModal}
                  color="secondary"
                  variant="contained"
                >
                  Declarar sin movimiento
                </Button>
              </Box>
              <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ ...style, width: 400 }}>
                  <p id="child-modal-description">
                    Esta seguro de declarar sin movimiento esta planilla?
                  </p>
                  <Button onClick={handleCloseModal} color="error">
                    Cancelar
                  </Button>
                  <Button onClick={handleCloseForm} color="secondary">
                    Continuar
                  </Button>
                </Box>
              </Modal>
            </React.Fragment>
          </div>
        )}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.primary[400] }}>
        <Button autoFocus onClick={handleCancel} color="error">
          Cerrar Planilla
        </Button>
      </DialogActions>
    </Dialog>
  );
}
