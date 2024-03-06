import {
  Box,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Header from "../../components/Header";
import { useApiContext } from "../../context/ApiContext";
import { tokens } from "../../theme";
import { uploadData } from "../../data/uploadData";
import Button from "@mui/material/Button";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const UploadFile = () => {
  const { industrySettings } = useApiContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const renderTableCell = (value) => <TableCell>{value}</TableCell>;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={industrySettings.periodName}
          subtitle="Subir reporte quincenal"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

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
                {renderTableCell(row.selector)}
                {renderTableCell(row.empty)}
                {renderTableCell(row.review)}
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
        >
          Guardar
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
/* periodName: 'empty',
year: 2020,
month: 1,
biweekly: 1,
startDate: "2024-02-01",
endDate: "2024-02-07",
limitDate: "2024-02-15",
status: 'undefined',
industryOptions: ['option1'],  */
