import React from "react";
import { BiweekelyStatusIcon } from "./Icons";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

// Define los datos de la leyenda como un array de objetos
const legendData = [
  {
    icon: <BiweekelyStatusIcon size={10} color={"green"} />,
    label: "Quincena declarada",
  },
  {
    icon: <BiweekelyStatusIcon size={10} color={"red"} />,
    label: "Quincena sin declarar",
  },
  {
    icon: <BiweekelyStatusIcon size={10} color={"orange"} />,
    label: "Quincena declarada con retraso",
  },
  {
    icon: <BiweekelyStatusIcon size={10} color={"lightslategray"} />,
    label: "Quincena no disponible",
  },
  {
    icon: <BiweekelyStatusIcon size={10} color={"white"} />,
    label: "Quincena en curso",
  },
  {
    icon: <BiweekelyStatusIcon size={10} color={"lightskyblue"} />,
    label: "Quincena con observación",
  },
];

export default function TableLegend() {
  return (
    <Box
      sx={{
        my: 2,
        p: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      {/* Itera sobre el array de datos de la leyenda */}
      {legendData.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          spacing={1}
          sx={{ display: "flex", direction: "row", alignItems: "center" }}
        >
          {item.icon}
          <Typography variant="body2">{item.label}</Typography>
        </Stack>
      ))}
    </Box>
  );
}
