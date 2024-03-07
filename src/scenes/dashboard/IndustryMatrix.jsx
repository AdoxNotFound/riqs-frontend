import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Dataset from "../../data/DataExample";
import { BiweekelyStatusIcon } from "./Icons";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

//deprecado 28/02/2024

const statusIcons = {
  Declarada: <BiweekelyStatusIcon size={20} color={"green"} />,
  "Sin Declarar": <BiweekelyStatusIcon size={20} color={"red"} />,
  "Fuera de Tiempo": <BiweekelyStatusIcon size={20} color={"orange"} />,
  "No Disponible": <BiweekelyStatusIcon size={20} color={"lightslategray"} />,
  "En Curso": <BiweekelyStatusIcon size={20} color={"white"} />,
  Observada: <BiweekelyStatusIcon size={20} color={"lightskyblue"} />,
};

export default function BasicTable() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperData, setPopperData] = useState(null);

  useEffect(() => {
    // Crear dos filas para las dos quincenas
    const firstRow = createRow(
      1,
      Dataset.filter((item) => item.quincena === 1)
    );
    const secondRow = createRow(
      2,
      Dataset.filter((item) => item.quincena === 2)
    );
    setRows([firstRow, secondRow]);
  }, []);

  const createRow = (quincena, data) => {
    //esta función sirve para armar la información del popper, pero se debe modificar cuando los formularios de la empresa sean diferentes
    const rowData = { quincena };
    for (let i = 1; i <= 12; i++) {
      const monthData = data.find((item) => item.mes === i);
      if (monthData) {
        const acopio =
          monthData.Acopio_TM !== null ? monthData.Acopio_TM.toString() : null;
        const granoRecibido =
          monthData.Grano_recibido_TM !== null
            ? monthData.Grano_recibido_TM.toString()
            : null;
        rowData[`mes${i}`] = {
          estado: monthData.Estado,
          quincena,
          mes: i,
          acopio,
          granoRecibido,
        };
      } else {
        rowData[`mes${i}`] = { estado: "", quincena, mes: i };
      }
    }
    return rowData;
  };

  const handleMouseEnter = (event, data) => {
    setAnchorEl(event.currentTarget);
    setPopperData(data);
  };

  const handleMouseLeave = () => {
    // Aquí puedes realizar cualquier acción cuando se retira el mouse de una celda
    setAnchorEl(null);
    setPopperData(null);
  };

  const open = Boolean(anchorEl);
  //backgroundColor={colors.primary[400]}
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      square={false}
      sx={{ maxWidth: 750, backgroundColor: colors.primary[400] }}
    >
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Quincena</TableCell>
            <TableCell>Ene</TableCell>
            <TableCell>Feb</TableCell>
            <TableCell>Mar</TableCell>
            <TableCell>Abr</TableCell>
            <TableCell>May</TableCell>
            <TableCell>Jun</TableCell>
            <TableCell>Jul</TableCell>
            <TableCell>Ago</TableCell>
            <TableCell>Sep</TableCell>
            <TableCell>Oct</TableCell>
            <TableCell>Nov</TableCell>
            <TableCell>Dic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ width: "50px" }}>
                {row.quincena}
              </TableCell>
              {Object.values(row)
                .slice(1)
                .map((data, index) => (
                  <TableCell
                    key={`${rowIndex}-${index}`}
                    align="right"
                    onMouseEnter={(event) => handleMouseEnter(event, data)}
                    onMouseLeave={handleMouseLeave}
                    sx={{ width: "50px" }}
                  >
                    {statusIcons[data.estado]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ backgroundColor: colors.primary[400] }}>
              {popperData && (
                <>
                  <Typography sx={{ p: 2 }}>
                    {`Quincena ${popperData.quincena}, Mes ${popperData.mes}`}
                  </Typography>
                  {popperData.estado && (
                    <Typography variant="body2">{`Estado: ${popperData.estado}`}</Typography>
                  )}
                  {popperData.acopio && (
                    <Typography variant="body2">{`Acopio: ${popperData.acopio} TM`}</Typography>
                  )}
                  {popperData.granoRecibido && (
                    <Typography variant="body2">{`Grano Recibido: ${popperData.granoRecibido} TM`}</Typography>
                  )}
                </>
              )}
            </Paper>
          </Fade>
        )}
      </Popper>
    </TableContainer>
  );
}
