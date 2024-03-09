import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Dataset from "../../data/DataExample";
import { BiweekelyStatusIcon } from "./Icons";
import { styled } from "@mui/material/styles";

const newStatusIcons = {
  Declarada: <BiweekelyStatusIcon size={20} color={"green"} />,
  "Sin Declarar": <BiweekelyStatusIcon size={20} color={"red"} />,
  "Fuera de Tiempo": <BiweekelyStatusIcon size={20} color={"orange"} />,
  "No Disponible": <BiweekelyStatusIcon size={20} color={"lightslategray"} />,
  "En Curso": <BiweekelyStatusIcon size={20} color={"white"} />,
  Observada: <BiweekelyStatusIcon size={20} color={"lightskyblue"} />,
};

const renderTypographyIfNotNull = (field, text, color) => {
  if (field !== null && field !== undefined) {
    return (
      <Typography
        variant="body2"
        color={color}
      >{`${text}: ${field} TM`}</Typography>
    );
  }
  return null;
};

const TooltipContent = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography variant="body1" color={colors.grey[100]}>
        {`Quincena ${data.quincena}, Mes ${data.mes}, Año ${data.gestion}`}
      </Typography>
      <Typography
        variant="body1"
        color={colors.grey[100]}
      >{`Estado: ${data.Estado}`}</Typography>
      {renderTypographyIfNotNull(data["Acopio_TM"], "Acopio", colors.grey[100])}
      {renderTypographyIfNotNull(
        data["Grano_recibido_TM"],
        "Grano Recibido",
        colors.grey[100]
      )}
      {renderTypographyIfNotNull(
        data["HS_TM"],
        "Harina de Soya",
        colors.grey[100]
      )}
      {renderTypographyIfNotNull(
        data["CS_TM"],
        "Cascarilla de Soya",
        colors.grey[100]
      )}
      {renderTypographyIfNotNull(
        data["ACS_TM"],
        "Aceite Crudo de Soya",
        colors.grey[100]
      )}
      {renderTypographyIfNotNull(
        data["ARS_TM"],
        "Aceite Refinado de Soya",
        colors.grey[100]
      )}
    </Box>
  );
};

export default function BasicTable() {
  //const [selectedItem, setSelectedItem] = useState(null):
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: colors.primary[400],
      boxShadow: theme.shadows[1],
    },
  }));

  const getStatusIcon = (status, item) => (
    <LightTooltip
      title={<TooltipContent data={item} />}
      arrow
      enterTouchDelay={0}
      enterDelay={500}
      followCursor
    >
      <div>{newStatusIcons[status]}</div>
    </LightTooltip>
  );

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            width: "80px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">Quincena</Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            1
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {" "}
            2
          </Typography>
        </Box>
        {months.map((month, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              width: "40px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">{month}</Typography>
            <Box
              sx={{
                display: "flex",
                width: "20px",
                height: "50px",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              {Dataset.map((item, dataIndex) => {
                if (item.mes === index + 1) {
                  return getStatusIcon(item.Estado, item);
                }
                return null;
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
}
