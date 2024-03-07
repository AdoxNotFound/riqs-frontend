import * as React from "react";
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

  const handleSheetChange = (event) => {
    setSelectedSheets(event.target.value);
  };

  const handleButtonClick = async () => {
    reviewAcopio(
      generalSettings.token,
      fileInfo.data.file_name,
      selectedSheets
    );
  };

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
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
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
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleClose()}>
          Disagree
        </Button>
        <Button onClick={() => handleClose()} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
