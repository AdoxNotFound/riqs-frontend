import * as React from "react";
import Button from "@mui/material/Button";

const ReviewButton = () => {
  return (
    <Button variant="outlined" color="secondary" size="small">
      Revisar
    </Button>
  );
};

export const uploadData = [
  {
    id: 1,
    reportName: "Acopio de Grano de Soya",
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
  {
    id: 2,
    reportName: "Grano Recibido con Precio Cerrado",
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
  {
    id: 3,
    reportName: "Ventas",
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
  {
    id: 4,
    reportName: "Reporte General de Producción",
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
  {
    id: 5,
    reportName: "Reporte General de Stock a fin de mes",
    review: <ReviewButton />,
    response: "Formulario pendiente",
  },
];
