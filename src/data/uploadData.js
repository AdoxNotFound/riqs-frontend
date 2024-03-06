import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BasicSelect = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const ReviewButton = () => {
  return (
    <Button variant="outlined" color="secondary" size="small">
      Revisar
    </Button>
  );
};

const SelectorButton = () => {
  return (
    <Button variant="outlined" color="secondary" size="small">
      Ingresar
    </Button>
  );
};

export const uploadData = [
  {
    id: 1,
    reportName: "Acopio de Grano de Soya",
    selector: <BasicSelect />,
    empty: <Checkbox {...label} defaultChecked color="secondary" />,
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
  {
    id: 2,
    reportName: "Grano Recibido con Precio Cerrado",
    selector: <BasicSelect />,
    empty: <Checkbox {...label} defaultChecked color="secondary" />,
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
  {
    id: 3,
    reportName: "Ventas",
    selector: <BasicSelect />,
    empty: <Checkbox {...label} defaultChecked color="secondary" />,
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
  {
    id: 4,
    reportName: "Reporte General de Producción",
    selector: <SelectorButton />,
    empty: <Checkbox {...label} defaultChecked color="secondary" />,
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
  {
    id: 5,
    reportName: "Reporte General de Stock a fin de mes",
    selector: <SelectorButton />,
    empty: <Checkbox {...label} defaultChecked color="secondary" />,
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
];
